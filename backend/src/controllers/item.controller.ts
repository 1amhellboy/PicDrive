import {createItem, deleteItem, getItemsByParent, renameItem, createShare, getShared, handleFileUpload, moveToTrash, getTrashedItems, restoreItem, emptyTrash, createFolder} from '../services/item.service';
import {Request, Response} from 'express';
import { deleteFileFromS3 } from '../utils/s3';
import { userInfo } from 'os';
import multer from 'multer';
import { ItemType } from '../generated/prisma';
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();


const upload = multer({ storage: multer.memoryStorage() });

// helper inside controller (or move to utils)
const normalizeParentId = async (parentId?: string | null): Promise<string | null> => {
  if (!parentId || parentId === "null" || parentId === "root") {
    return null; // ✅ treat as root
  }

  try {
    const parent = await prisma.item.findUnique({ where: { id: parentId } });
    if (!parent) {
      console.warn(`⚠️ normalizeParentId: parentId ${parentId} not found, falling back to root`);
      return null; // ✅ fallback instead of throwing
    }
    return parent.id;
  } catch (err) {
    console.error("normalizeParentId error:", err);
    return null; // ✅ fallback to root on DB error
  }
};



// Create (file or folder)
// export const create = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, type, parentId, mimeType, size, url } = req.body;
//     const userId = req.user?.id;

//     if (!userId) {
//       res.status(401).json({ message: 'Unauthorized: userId missing' });
//       return;
//     }

//     const item = await createItem(name, type, userId, parentId || null, mimeType, size, url);
//     res.status(201).json(item);
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || 'Failed to create item' });
//   }
// };


export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, parentId, mimeType, size, url } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: userId missing' });
      return;
    }

    const normalizedParentId = await normalizeParentId(parentId);

    const item = await createItem(name, type, userId, normalizedParentId, mimeType, size, url);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to create item' });
  }
};

// Read (get items by parent)
// export const getByParent = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { parentId } = req.params;
//     const userId = req.user?.id;

//     if (!userId) {
//       res.status(401).json({ message: 'Unauthorized: userId missing' });
//       return;
//     }

//     const items = await getItemsByParent(parentId === 'root' ? null : parentId, userId);
//     res.status(200).json(items);
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || 'Failed to fetch items' });
//   }
// };
export const getByParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: userId missing" });
      return;
    }

    // Normalize parentId
    let normalizedParentId: string | null;
    if (parentId === "null" || parentId === "root") {
      normalizedParentId = null;
    } else {
      normalizedParentId = parentId;
    }

    const items = await getItemsByParent(normalizedParentId, userId);
    res.status(200).json(items);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to fetch items" });
  }
};

// Update (rename)
export const rename = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: userId missing' });
      return;
    }

    const updated = await renameItem(id, name, userId);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to rename item' });
  }
};

// Delete
// export const remove = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     if (!userId) {
//       res.status(401).json({ message: 'Unauthorized: userId missing' });
//       return;
//     }

//     await deleteItem(id, userId);
//     res.status(204).json({ message: 'Item deleted successfully' });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || 'Failed to delete item' });
//   }
// };

// export const remove = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     if (!userId) {
//       res.status(401).json({ message: 'Unauthorized: userId missing' });
//       return;
//     }

//     // 1. Find the item in DB to get its S3 key
//     const item = await prisma.item.findUnique({
//       where: { id },
//     });

//     if (!item || item.userId !== userId) {
//       res.status(404).json({ message: 'Item not found or unauthorized' });
//       return;
//     }

//     // 2. Delete from DB
//     await deleteItem(id, userId);

//     // 3. If it's a file, delete from S3
//     if (item.type === 'file' && item.url) {
//       try {
//         const key = item.url.split('/').pop(); // extract the key from the URL
//         if (key) await deleteFileFromS3(key);
//       } catch (s3Error) {
//         console.error("S3 deletion failed:", s3Error);
//         // Not throwing here because DB deletion was successful
//       }
//     }

//     res.status(200).json({ message: 'Item deleted successfully' });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || 'Failed to delete item' });
//   }
// };

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: userId missing" });
      return;
    }

    await deleteItem(id, userId);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to delete item" });
  }
};


// Share 

export const shareItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { itemId, sharedWith, isPublic, permission } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!itemId || !permission) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const share = await createShare(userId,itemId, sharedWith, isPublic, permission);
    res.status(201).json({ message: 'Item shared', shareId: share.id });
  } catch (err: any) {
    console.error("Error creating share:", err); // Helpful for debugging
    res.status(500).json({ error: err.message });
  }
};


// Get shared item by id

export const accessSharedItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const share = await getShared(id);

    if (!share) {
      res.status(404).json({ message: 'Share not found' });
      return;
    }

    if (!share.isPublic) {
      if (!userId || userId !== share.sharedWith) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }
    }

    res.status(200).json(share.item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


// Upload to AWS

// export const uploadFile = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   if (!userId) {res.status(401).json({ error: "Unauthorized" })
//     return;
//   }

//   if (!req.file) { res.status(400).json({ error: "File is required" })
//     return;
//   }

//   let uploaded;
//   try {
//     // 1. Upload to S3
//     uploaded = await handleFileUpload(req.file);

//     // 2. Save metadata in DB
//     const savedItem = await createItem(
//       req.file.originalname,
//       "file",
//       userId,
//       req.body.parentId || null,
//       req.file.mimetype,
//       req.file.size,
//       uploaded.url
//     );

//     // 3. Log activity (upload)
//     await prisma.activityLog.create({
//       data: {
//         userId,
//         itemId: savedItem.id,
//         action: "upload",
//       },
//     });

//     res.status(201).json({
//       message: "Upload successful",
//       file: savedItem,
//     });
//   } catch (error) {
//     console.error("Upload failed:", error);

//     // Rollback: delete file from S3 if DB operation failed
//     if (uploaded?.key) {
//       try {
//         await deleteFileFromS3(uploaded.key);
//       } catch (s3Error) {
//         console.error("Rollback failed: Could not delete from S3", s3Error);
//       }
//     }

//     res.status(500).json({ error: "Upload failed, rolled back" });
//   }
// };


export const uploadFile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  if (!req.file) return res.status(400).json({ error: "File is required" });

  let uploaded;
  try {
    // 1. Upload to S3
    uploaded = await handleFileUpload(req.file);

    // 2. Normalize parentId
    const parentId = await normalizeParentId(req.body.parentId);

    // 3. Save metadata in DB
    const savedItem = await createItem(
      req.file.originalname,
      "file",
      userId,
      parentId,
      req.file.mimetype,
      req.file.size,
      uploaded.url
    );

    // 4. Log activity
    await prisma.activityLog.create({
      data: { userId, itemId: savedItem.id, action: "upload" },
    });

    res.status(201).json({ message: "Upload successful", file: savedItem });
  } catch (error: any) {
    console.error("Upload failed:", error);

    // Rollback if needed
    if (uploaded?.key) {
      try { await deleteFileFromS3(uploaded.key); } catch {}
    }

    res.status(500).json({ error: error.message || "Upload failed, rolled back" });
  }
};


// item.controller.ts
export const trashItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await moveToTrash(id, userId);

    res.status(200).json({ message: "Item moved to trash" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to move item to trash" });
  }
};

// Get all trashed items
export const getTrash = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const trashed = await getTrashedItems(userId);
    res.status(200).json(trashed);
  } catch (err: any) {
    console.error("Error fetching trashed items:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch trashed items" });
  }
};



export const restore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const restored = await restoreItem(id, userId);
    res.status(200).json({ message: "Item restored", restored });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to restore item" });
  }
};


export const clearTrash = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await emptyTrash(userId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to empty trash" });
  }
};


// export const uploadFolder = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   if (!userId) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }

//   if (!req.files || !(req.files instanceof Array)) {
//     res.status(400).json({ error: "No files uploaded" });
//     return;
//   }

//   try {
//     const parentId = req.body.parentId || null;
//     const uploadedItems = [];

//     for (const file of req.files as Express.Multer.File[]) {
//       const uploaded = await handleFileUpload(file);

//       const savedItem = await createItem(
//         file.originalname,
//         "file",
//         userId,
//         parentId, // use parentId from request (represents folder in DB)
//         file.mimetype,
//         file.size,
//         uploaded.url
//       );

//       // Log activity
//       await prisma.activityLog.create({
//         data: {
//           userId,
//           itemId: savedItem.id,
//           action: "upload",
//         },
//       });

//       uploadedItems.push(savedItem);
//     }

//     res.status(201).json({
//       message: "Folder uploaded successfully",
//       items: uploadedItems,
//     });
//   } catch (err) {
//     console.error("Folder upload failed:", err);
//     res.status(500).json({ error: "Folder upload failed" });
//   }
// };

// Upload Folder + Maintain Hierarchy
// export const uploadFolder = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   if (!userId) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }

//   if (!req.files || !(req.files instanceof Array)) {
//     res.status(400).json({ error: "No files provided" });
//     return;
//   }

//   try {
//     // ✅ normalize the top-level parent (in case you upload into an existing folder)
//     const rootParentId = await normalizeParentId(req.body.parentId);

//     // Map to track folder paths → DB IDs
//     const folderMap: Record<string, string | null> = { "": rootParentId };

//     for (const file of req.files as Express.Multer.File[]) {
//       // e.g. "myFolder/subFolder/file.txt"
//       const relativePath = (file as any).webkitRelativePath || file.originalname;
//       const parts = relativePath.split("/");

//       let currentParentId: string | null = rootParentId;
//       let currentPath = "";

//       // Rebuild folders
//       for (let i = 0; i < parts.length - 1; i++) {
//         currentPath += (currentPath ? "/" : "") + parts[i];

//         if (!folderMap[currentPath]) {
//           const folder = await createFolder(parts[i], userId, currentParentId);
//           folderMap[currentPath] = folder.id;
//         }
//         currentParentId = folderMap[currentPath];
//       }

//       // Upload file to S3
//       const uploaded = await handleFileUpload(file);

//       // Save file in DB
//       await createItem(
//         file.originalname,
//         "file",
//         userId,
//         currentParentId,
//         file.mimetype,
//         file.size,
//         uploaded.url
//       );
//     }

//     res.status(201).json({ message: "Folder uploaded successfully" });
//   } catch (error: any) {
//     console.error("Folder upload failed:", error);
//     res.status(500).json({ error: error.message || "Folder upload failed" });
//   }
// };

// export const uploadFolder = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   if (!userId) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }

//   if (!req.files || !(req.files instanceof Array)) {
//     res.status(400).json({ error: "No files provided" });
//     return;
//   }

//   try {
//     // ✅ normalize parentId (destination folder, if uploading inside an existing one)
//     const rootParentId = await normalizeParentId(req.body.parentId);

//     // Take the first file’s relative path → extract top-level folder name
//     const firstFile = req.files[0] as any;
//     const relativePath = firstFile.webkitRelativePath;
//     const topLevelFolder = relativePath ? relativePath.split("/")[0] : null;

//     // ✅ Create the top-level folder in DB
//     let topFolderId = rootParentId;
//     if (topLevelFolder) {
//       const topFolder = await createFolder(topLevelFolder, userId, rootParentId);
//       topFolderId = topFolder.id;
//     }

//     // Map to track subfolders
//     const folderMap: Record<string, string | null> = { "": topFolderId };

//     for (const file of req.files as Express.Multer.File[]) {
//       const relativePath = (file as any).webkitRelativePath || file.originalname;
//       const parts = relativePath.split("/");

//       let currentParentId: string | null = topFolderId;
//       let currentPath = topLevelFolder || "";

//       // ✅ build subfolders under top-level folder
//       for (let i = 1; i < parts.length - 1; i++) {
//         currentPath += "/" + parts[i];
//         if (!folderMap[currentPath]) {
//           const folder = await createFolder(parts[i], userId, currentParentId);
//           folderMap[currentPath] = folder.id;
//         }
//         currentParentId = folderMap[currentPath];
//       }

//       // Upload file to S3
//       const uploaded = await handleFileUpload(file);

//       // Save file in DB
//       await createItem(
//         file.originalname,
//         "file",
//         userId,
//         currentParentId,
//         file.mimetype,
//         file.size,
//         uploaded.url
//       );
//     }

//     res.status(201).json({ message: "Folder uploaded successfully" });
//   } catch (error: any) {
//     console.error("Folder upload failed:", error);
//     res.status(500).json({ error: error.message || "Folder upload failed" });
//   }
// };

export const uploadFolder = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!req.files || !(req.files instanceof Array)) {
    return res.status(400).json({ error: "No files provided" });
  }

  try {
    const rootParentId = await normalizeParentId(req.body.parentId);
    const folderMap: Record<string, string | null> = { "": rootParentId };

    for (const file of req.files as Express.Multer.File[]) {
      // ✅ originalname contains relative path because frontend preserved it
      const relativePath = file.originalname;
      const parts = relativePath.split("/");

      let currentParentId: string | null = rootParentId;
      let currentPath = "";

      // ✅ Create missing folders
      for (let i = 0; i < parts.length - 1; i++) {
        currentPath += (currentPath ? "/" : "") + parts[i];

        if (!folderMap[currentPath]) {
          const folder = await createFolder(parts[i], userId, currentParentId);
          folderMap[currentPath] = folder.id;
        }
        currentParentId = folderMap[currentPath];
      }

      // ✅ Upload the actual file to S3
      const uploaded = await handleFileUpload(file);

      await createItem(
        parts[parts.length - 1], // only file name
        "file",
        userId,
        currentParentId,
        file.mimetype,
        file.size,
        uploaded.url
      );
    }

    res.status(201).json({ message: "Folder uploaded successfully" });
  } catch (error: any) {
    console.error("Folder upload failed:", error);
    res.status(500).json({ error: error.message || "Folder upload failed" });
  }
};
