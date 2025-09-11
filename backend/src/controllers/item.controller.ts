import {createItem, deleteItem, getItemsByParent, renameItem, createShare, getShared, handleFileUpload, moveToTrash, getTrashedItems, restoreItem} from '../services/item.service';
import {Request, Response} from 'express';
import { deleteFileFromS3 } from '../utils/s3';
import { userInfo } from 'os';
import multer from 'multer';
import { ItemType } from '../generated/prisma';
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();


const upload = multer({ storage: multer.memoryStorage() });


// Create (file or folder)
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, parentId, mimeType, size, url } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: userId missing' });
      return;
    }

    const item = await createItem(name, type, userId, parentId || null, mimeType, size, url);
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

export const uploadFile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {res.status(401).json({ error: "Unauthorized" })
    return;
  }

  if (!req.file) { res.status(400).json({ error: "File is required" })
    return;
  }

  let uploaded;
  try {
    // 1. Upload to S3
    uploaded = await handleFileUpload(req.file);

    // 2. Save metadata in DB
    const savedItem = await createItem(
      req.file.originalname,
      "file",
      userId,
      req.body.parentId || null,
      req.file.mimetype,
      req.file.size,
      uploaded.url
    );

    // 3. Log activity (upload)
    await prisma.activityLog.create({
      data: {
        userId,
        itemId: savedItem.id,
        action: "upload",
      },
    });

    res.status(201).json({
      message: "Upload successful",
      file: savedItem,
    });
  } catch (error) {
    console.error("Upload failed:", error);

    // Rollback: delete file from S3 if DB operation failed
    if (uploaded?.key) {
      try {
        await deleteFileFromS3(uploaded.key);
      } catch (s3Error) {
        console.error("Rollback failed: Could not delete from S3", s3Error);
      }
    }

    res.status(500).json({ error: "Upload failed, rolled back" });
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

