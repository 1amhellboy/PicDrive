import { PrismaClient,Permission } from '../generated/prisma';
import { uploadFileToS3,deleteFileFromS3 } from '../utils/s3';

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


// Get items by parent ID and user ID

export const getItemsByParent = async (parentId: string | null, userId: string) => {
  try {
    return await prisma.item.findMany({
      where: {
        parentId,
        userId,
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


// Delete an item

// export const deleteItem = async (itemId: string, userId: string) => {
//   try {
//     const result = await prisma.item.deleteMany({
//       where: {
//         id: itemId,
//         userId,
//       },
//     });

//     if (result.count === 0) {
//       throw new Error('Item not found or unauthorized');
//     }

//     return result;
//   } catch (error) {
//     console.error('Error deleting item:', error);
//     throw new Error('Failed to delete item');
//   }
// };

// export const deleteItem = async (itemId: string, userId: string) => {
//   try {
//     await prisma.activityLog.deleteMany({
//       where: { itemId }
//     });

//     const result = await prisma.item.deleteMany({
//       where: {
//         id: itemId,
//         userId,
//       },
//     });

//     if (result.count === 0) {
//       throw new Error('Item not found or unauthorized');
//     }

//     return result;
//   } catch (error) {
//     console.error('Error deleting item:', error);
//     throw new Error('Failed to delete item');
//   }
// };

export const deleteItem = async (itemId: string, userId: string) => {
  try {
    // 1. Find item (we need the URL before deleting)
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item || item.userId !== userId) {
      throw new Error("Item not found or unauthorized");
    }

    // 2. Delete activity logs linked to this item
    await prisma.activityLog.deleteMany({ where: { itemId } });

    // 3. Delete item from DB
    const result = await prisma.item.deleteMany({
      where: { id: itemId, userId },
    });

    if (result.count === 0) {
      throw new Error("Item not found or unauthorized");
    }

    // 4. If it's a file, delete from S3
    if (item.type === "file" && item.url) {
      try {
        const key = item.url.split("/").pop(); // extract key from URL
        if (key) {
          await deleteFileFromS3(key);
        }
      } catch (s3Error) {
        console.error("S3 deletion failed:", s3Error);
        // Don’t throw — DB deletion was already successful
      }
    }

    return result;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item");
  }
};




// Store shared item in DB

export const createShare = async(userId:string,itemId:string, sharedWith:string, isPublic:boolean, permission:Permission)=>{
  try{
    const result =  await prisma.share.create({
      data:{
        itemId,
        sharedWith: isPublic ? null : sharedWith,
        isPublic,
        permission,       
      }
    });
        await prisma.activityLog.create({
        data: {
          userId,
          itemId,
          action: 'share',
        },
    });
    console.log(result);
    return result;

  }  catch(err:any){
      console.error('Prisma Error:', err.message);
      throw err;    
  }

}


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



