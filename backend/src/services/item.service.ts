import { PrismaClient,Permission } from '../generated/prisma';
import { uploadFileToS3,deleteFileFromS3,getDownloadUrl,getS3KeyFromUrl,getS3ObjectStream } from '../utils/s3';
import { Response } from "express";
import archiver from "archiver";

const prisma = new PrismaClient();


// Create a new item (file or folder)

export const createItem = async (
  name: string,
  type: 'file' | 'folder',
  userId: string,
  parentId: string | null,
  mimeType?: string,
  size?: number,
  url?: string
) => {
  try {
    return await prisma.item.create({
      data: {
        name,
        type,
        userId,
        parentId,
        mimeType,
        size,
        url,
      },
    });
  } catch (error) {
    console.error('Error creating item:', error);
    throw new Error('Failed to create item');
  }
};

export const createFolder = async (
  name: string,
  userId: string,
  parentId: string | null
) => {
  try {
    return await prisma.item.create({
      data: {
        name,
        type: "folder",
        userId,
        parentId,
      },
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error("Failed to create folder");
  }
}

// Get items by parent ID and user ID

export const getItemsByParent = async (parentId: string | null, userId: string) => {
  try {
    return await prisma.item.findMany({
      where: {
        parentId,
        userId,
        isTrashed: false,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    throw new Error('Failed to fetch items');
  }
};



// Rename an item

export const renameItem = async (itemId: string, name: string, userId: string) => {
  try {
    const result = await prisma.item.updateMany({
      where: {
        id: itemId,
        userId,
      },
      data: { name },
    });

    if (result.count === 0) {
      throw new Error('Item not found or unauthorized');
    }
    
    await prisma.activityLog.create({
        data: {
          userId,
          itemId,
          action: 'rename',
        },
    });

    return result;
  } catch (error) {
    console.error('Error renaming item:', error);
    throw new Error('Failed to rename item');
  }
};


// export const deleteItem = async (itemId: string, userId: string) => {
//   try {
//     // 1. Find item (we need the URL before deleting)
//     const item = await prisma.item.findUnique({
//       where: { id: itemId },
//     });

//     if (!item || item.userId !== userId) {
//       throw new Error("Item not found or unauthorized");
//     }

//     // 2. Delete activity logs linked to this item
//     await prisma.activityLog.deleteMany({ where: { itemId } });

//     // 3. Delete item from DB
//     const result = await prisma.item.deleteMany({
//       where: { id: itemId, userId },
//     });

//     if (result.count === 0) {
//       throw new Error("Item not found or unauthorized");
//     }

//     // 4. If it's a file, delete from S3
//     if (item.type === "file" && item.url) {
//       try {
//         const key = item.url.split("/").pop(); // extract key from URL
//         if (key) {
//           await deleteFileFromS3(key);
//         }
//       } catch (s3Error) {
//         console.error("S3 deletion failed:", s3Error);
//         // Don’t throw — DB deletion was already successful
//       }
//     }

//     return result;
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     throw new Error("Failed to delete item");
//   }
// };

export const deleteItem = async (itemId: string, userId: string) => {
  try {
    // 1. Try deleting an owned item
    const owned = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (owned && owned.userId === userId) {
      // Delete activity logs
      await prisma.activityLog.deleteMany({ where: { itemId } });

      // Delete from DB
      const result = await prisma.item.deleteMany({
        where: { id: itemId, userId },
      });

      // Delete from S3 if it's a file
      if (owned.type === "file" && owned.url) {
        try {
          const key = owned.url.split("/").pop();
          if (key) await deleteFileFromS3(key);
        } catch (s3Error) {
          console.error("S3 deletion failed:", s3Error);
        }
      }

      return { deleted: "owned", itemId };
    }

    // 2. If not owned, try deleting a shared item
    const shared = await prisma.share.deleteMany({
      where: { itemId, sharedWith: userId },
    });

    if (shared.count > 0) {
      await prisma.activityLog.create({
        data: {
          userId,
          itemId,
          action: "delete",
          details: "deleted shared item link",
        },
      });
      return { deleted: "shared", itemId };
    }

    // 3. If neither worked → unauthorized
    throw new Error("Item not found or unauthorized");
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item");
  }
};




// Store shared item in DB

// export const createShare = async(userId:string,itemId:string, sharedWith:string, isPublic:boolean, permission:Permission)=>{
//   try{
//     const result =  await prisma.share.create({
//       data:{
//         itemId,
//         sharedWith: isPublic ? null : sharedWith,
//         isPublic,
//         permission,       
//       }
//     });
//         await prisma.activityLog.create({
//         data: {
//           userId,
//           itemId,
//           action: 'share',
//         },
//     });
//     console.log(result);
//     return result;

//   }  catch(err:any){
//       console.error('Prisma Error:', err.message);
//       throw err;    
//   }

// }

export const createShare = async (
  userId: string,
  itemId: string,
  recipientUserId: string | null,
  isPublic: boolean,
  permission: Permission
) => {
  try {
    const result = await prisma.share.create({
      data: {
        itemId,
        sharedWith: isPublic ? null : recipientUserId, // ✅ userId instead of email
        isPublic,
        permission,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId,
        itemId,
        action: "share",
      },
    });

    return result;
  } catch (err: any) {
    console.error("Prisma Error:", err.message);
    throw err;
  }
};


// Get Shared item from DB

export const getShared = async(shareId:string)=>{
  return await prisma.share.findUnique({
    where:{id:shareId},
    include:{item:true}
  })
}

// Upload file to cloud

export const handleFileUpload = async (file: Express.Multer.File) => {
  const result = await uploadFileToS3(file);
  return result;
};


// // item.service.ts
// export const moveToTrash = async (itemId: string, userId: string) => {
//   try {
//     const item = await prisma.item.updateMany({
//       where: { id: itemId, userId },
//       data: { isTrashed: true },
//     });

//     if (item.count === 0) {
//       throw new Error("Item not found or unauthorized");
//     }

//     await prisma.activityLog.create({
//       data: {
//         userId,
//         itemId,
//         action: "move",
//         details: "Moved to trash",
//       },
//     });

//     return item;
//   } catch (error) {
//     console.error("Error moving item to trash:", error);
//     throw new Error("Failed to move item to trash");
//   }
// };

export const moveToTrash = async (itemId: string, userId: string) => {
  try {
    // 1. Try to move if user owns the item
    const item = await prisma.item.updateMany({
      where: { id: itemId, userId },
      data: { isTrashed: true },
    });

    if (item.count > 0) {
      await prisma.activityLog.create({
        data: {
          userId,
          itemId,
          action: "move",
          details: "Moved to trash",
        },
      });
      return { success: true, type: "item" };
    }

    // 2. If not owner, check if item is shared with user
    const share = await prisma.share.updateMany({
      where: { itemId, sharedWith: userId },
      data: { isTrashed: true },
    });

    if (share.count > 0) {
      await prisma.activityLog.create({
        data: {
          userId,
          itemId,
          action: "move",
          details: "Shared item moved to trash",
        },
      });
      return { success: true, type: "share" };
    }

    // 3. Neither owner nor recipient
    throw new Error("Item not found or unauthorized");
  } catch (error) {
    console.error("Error moving item to trash:", error);
    throw new Error("Failed to move item to trash");
  }
};



// Get all trashed items for a user
// export const getTrashedItems = async (userId: string) => {
//   try {
//     return await prisma.item.findMany({
//       where: {
//         userId,
//         isTrashed: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching trashed items:", error);
//     throw new Error("Failed to fetch trashed items");
//   }
// };

export const getTrashedItems = async (userId: string) => {
  try {
    // 1. Items owned by the user that are trashed
    const ownedItems = await prisma.item.findMany({
      where: { userId, isTrashed: true },
      orderBy: { createdAt: "desc" },
    });

    // 2. Items shared with the user that are trashed
    const sharedItems = await prisma.share.findMany({
      where: { sharedWith: userId, isTrashed: true },
      include: { item: true },
    });

    // Merge: return only the item details for shared ones
    return [
      ...ownedItems,
      ...sharedItems.map((s) => s.item),
    ];
  } catch (error) {
    console.error("Error fetching trashed items:", error);
    throw new Error("Failed to fetch trashed items");
  }
};


// Restore an item (move back from trash)
// export const restoreItem = async (itemId: string, userId: string) => {
//   try {
//     const result = await prisma.item.updateMany({
//       where: {
//         id: itemId,
//         userId,
//         isTrashed: true,   // ✅ only trashed items can be restored
//       },
//       data: { isTrashed: false },
//     });

//     if (result.count === 0) {
//       throw new Error("Item not found or unauthorized");
//     }

//     await prisma.activityLog.create({
//       data: {
//         userId,
//         itemId,
//         action: "move",   // ✅ reuse move action
//         details: "restored from trash",
//       },
//     });

//     return result;
//   } catch (error) {
//     console.error("Error restoring item:", error);
//     throw new Error("Failed to restore item");
//   }
// };
export const restoreItem = async (itemId: string, userId: string) => {
  try {
    // 1. Try restoring an owned item first
    const owned = await prisma.item.updateMany({
      where: {
        id: itemId,
        userId,
        isTrashed: true,
      },
      data: { isTrashed: false },
    });

    if (owned.count > 0) {
      await prisma.activityLog.create({
        data: {
          userId,
          itemId,
          action: "move",
          details: "restored from trash",
        },
      });
      return { restored: "owned", itemId };
    }

    // 2. If not owned, try restoring a shared item
    const shared = await prisma.share.updateMany({
      where: {
        itemId,
        sharedWith: userId,
        isTrashed: true,
      },
      data: { isTrashed: false },
    });

    if (shared.count > 0) {
      await prisma.activityLog.create({
        data: {
          userId,
          itemId,
          action: "move",
          details: "restored shared item from trash",
        },
      });
      return { restored: "shared", itemId };
    }

    // 3. If nothing restored → error
    throw new Error("Item not found in trash or unauthorized");
  } catch (error) {
    console.error("Error restoring item:", error);
    throw new Error("Failed to restore item");
  }
};


export const emptyTrash = async (userId: string) => {
  try {
    // 1. Find trashed items
    const trashedItems = await prisma.item.findMany({
      where: { userId, isTrashed: true }, // adjust condition to your schema
    });

    const trashedItemIds = trashedItems.map(item => item.id);

    if (trashedItemIds.length === 0) return { message: "Trash is already empty" };

    // 2. Delete dependent records first
    await prisma.activityLog.deleteMany({
      where: { itemId: { in: trashedItemIds } },
    });

    await prisma.share.deleteMany({
      where: { itemId: { in: trashedItemIds } },
    });

    // 3. Delete items
    await prisma.item.deleteMany({
      where: { id: { in: trashedItemIds } },
    });

    return { message: "Trash emptied successfully" };
  } catch (error) {
    console.error("Error emptying trash:", error);
    throw new Error("Failed to empty trash");
  }
};

export const generateDownloadLink = async (fileId: string) => {
  const file = await prisma.item.findUnique({ where: { id: fileId } });

  if (!file || file.type === "folder" || !file.url) {
    throw new Error("File not found or is a folder");
  }

  const key = getS3KeyFromUrl(file.url);

  const url = await getDownloadUrl(
    key,
    file.name,                             // correct filename with extension
    file.mimeType || "application/octet-stream" // fallback if missing
  );

  return url;
};



// Get all items shared with a user
export const getSharedWithUser = async (userId: string) => {
  return await prisma.share.findMany({
    where: {
      OR: [
        { sharedWith: userId, isTrashed:false },   // explicitly shared
        { isPublic: true },       // public shares
      ],
    },
    include: {
      item: true,
    },
  });
};

// item.service.ts
export const getRecentItems = async (userId: string) => {
  const activities = await prisma.activityLog.findMany({
    where: {
      userId,
      action: { in: ["upload", "open"] },
    },
    orderBy: { timestamp: "desc" },
    include: { item: true },
    take: 10, // grab more, then filter unique
  });

  // Remove duplicates by itemId, keep latest
  const unique = Array.from(new Map(activities.map(a => [a.itemId, a])).values());

  // return last 4
  return unique.slice(0, 4).map(a => a.item);
};


// services/item.service.ts

//  Toggle star
export const toggleStar = async (itemId: string, userId: string) => {
  const item = await prisma.item.findFirst({
    where: { id: itemId, userId },
  });

  if (!item) throw new Error("Item not found or unauthorized");

  const updated = await prisma.item.update({
    where: { id: itemId },
    data: { isStarred: !item.isStarred },
  });

  await prisma.activityLog.create({
    data: {
      userId,
      itemId,
      action: "star",
      details: updated.isStarred ? "Starred" : "Unstarred",
    },
  });

  return updated;
};

//  Get starred items
export const getStarredItems = async (userId: string) => {
  return prisma.item.findMany({
    where: {
      userId,
      isStarred: true,
      isTrashed: false,
    },
    orderBy: { createdAt: "desc" },
  });
};


export const getUserStorageUsage = async(userId:string)=>{
  const items = await prisma.item.findMany({
    where:{userId,type:'file',isTrashed:false},
    select:{size:true,mimeType:true},
  })

  const totalUsed = items.reduce((sum,f)=> sum +(f.size || 0),0)

  let documents = 0,
    photos = 0,
    videos = 0


  items.forEach((f)=>{
    if(!f.mimeType) return;
    if(f.mimeType.startsWith('image/')){
      photos += f.size || 0
    } else if(f.mimeType.startsWith('video/')){
      videos += f.size || 0
    } else{
      documents += f.size || 0
    }
  })

  const total = 1 * 1024 * 1024 * 1024 // 1GB

  return {
    total,
    used:totalUsed,
    documents,
    photos,
    videos,
  }
   
}



export const exportUserData = async (userId: string, res: Response) => {
  // 1️ Fetch all user’s files
  const items = await prisma.item.findMany({
    where: { userId, type: "file", isTrashed: false },
  })

  if (!items.length) {
    res.status(404).json({ error: "No files to export" })
    return
  }

  // 2️ Setup ZIP stream
  res.setHeader("Content-Type", "application/zip")
  res.setHeader("Content-Disposition", "attachment; filename=data-export.zip")

  const archive = archiver("zip", { zlib: { level: 9 } })
  archive.pipe(res)

  // 3️ Append each file to archive
  for (const item of items) {
    if (!item.url) continue

    const key = item.url.split("/").pop()
    if (!key) continue

    try {
      const stream = await getS3ObjectStream(key)
      if (stream) {
        archive.append(stream as any, { name: item.name })
      }
    } catch (err) {
      console.error(`Failed to fetch ${item.name}:`, err)
    }
  }

  await archive.finalize()
}



export async function updateProfile(
  userId: string,
  data: { name: string; email: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  })
}

function formatStorage(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}

//  Get account stats
// export async function getAccountStats(userId: string) {
//   // Count files uploaded by this user
//   const filesUploaded = await prisma.item.count({
//     where: { userId, type: "file" },
//   })

//   // Sum storage used by this user
//   const storageUsedBytes = await prisma.item.aggregate({
//     where: { userId, type: "file" },
//     _sum: { size: true },
//   })

//   // Count files this user has shared
//   const sharedFiles = await prisma.share.count({
//     where: { sharedWith: userId },
//   })

//   return {
//     filesUploaded,
//     // storageUsed: `${((storageUsedBytes._sum.size || 0) / (1024 * 1024 * 1024)).toFixed(2)} GB`,
//     storageUsed: formatStorage(bytes), // ✅ auto formatted
//     sharedFiles,
//   }
// }

export async function getAccountStats(userId: string) {
  // Count files uploaded by this user
  const filesUploaded = await prisma.item.count({
    where: { userId, type: "file" },
  })

  //  Reuse storage calculation
  const storageUsage = await getUserStorageUsage(userId)

  // Count files this user has shared
  const sharedFiles = await prisma.share.count({
    where: { sharedWith: userId }, //  use correct field (sharedById)
  })

  return {
    filesUploaded,
    storageUsed: formatStorage(storageUsage.used), //  use formatted bytes
    sharedFiles,
  }
}
