import {createItem, deleteItem, getItemsByParent, renameItem, createShare, getShared, handleFileUpload, moveToTrash, getTrashedItems, restoreItem, emptyTrash, createFolder, generateDownloadLink} from '../services/item.service';
import {Request, Response} from 'express';
import { deleteFileFromS3, getSignedFileUrl } from '../utils/s3';
import { userInfo } from 'os';
import multer from 'multer';
import { ItemType } from '../generated/prisma';
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();


const upload = multer({ storage: multer.memoryStorage() });

// helper inside controller (or move to utils)
const normalizeParentId = async (parentId?: string | null): Promise<string | null> => {
  if (!parentId || parentId === "null" || parentId === "root") {
    return null; // treat as root
  }

  try {
    const parent = await prisma.item.findUnique({ where: { id: parentId } });
    if (!parent) {
      console.warn(`normalizeParentId: parentId ${parentId} not found, falling back to root`);
      return null; // allback instead of throwing
    }
    return parent.id;
  } catch (err) {
    console.error("normalizeParentId error:", err);
    return null; // fallback to root on DB error
  }
};


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
// export const rename = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;
//     const userId = req.user?.id;

//     if (!userId) {
//       res.status(401).json({ message: 'Unauthorized: userId missing' });
//       return;
//     }

//     const updated = await renameItem(id, name, userId);
//     res.status(200).json(updated);
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || 'Failed to rename item' });
//   }
// };

// export const rename = async (req: Request, res: Response): Promise<void> => {
//   try {

//     console.log("Rename request params:", req.params);
//     console.log("Rename request body:", req.body);

//     const { id } = req.params
//     const { name } = req.body
//     const userId = req.user?.id


//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized: userId missing" })
//       return
//     }

//     if (!name || typeof name !== "string" || !name.trim()) {
//       res.status(400).json({ message: "Invalid name" })
//       return
//     }

//     const updated = await renameItem(id, name.trim(), userId)
//     res.status(200).json(updated)
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || "Failed to rename item" })
//   }
// }


export const rename = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🟢 Rename request params:", req.params);
    console.log("🟢 Rename request body:", req.body);

    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: userId missing" });
      return 
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      res.status(400).json({ message: "Invalid name", received: req.body })
      return 
    }

    const updated = await renameItem(id, name.trim(), userId);

    if (updated.count === 0) {
      res.status(404).json({ message: "Item not found or unauthorized" })
      return 
    }

    res.status(200).json({ message: "Item renamed", name });
  } catch (err: any) {
    console.error("❌ Rename error:", err);
    res.status(500).json({ message: err.message || "Failed to rename item" });
  }
};



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
      //  originalname contains relative path because frontend preserved it
      const relativePath = file.originalname;
      const parts = relativePath.split("/");

      let currentParentId: string | null = rootParentId;
      let currentPath = "";

      //  Create missing folders
      for (let i = 0; i < parts.length - 1; i++) {
        currentPath += (currentPath ? "/" : "") + parts[i];

        if (!folderMap[currentPath]) {
          const folder = await createFolder(parts[i], userId, currentParentId);
          folderMap[currentPath] = folder.id;
        }
        currentParentId = folderMap[currentPath];
      }

      //  Upload the actual file to S3
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



export const getFileUrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const item = await prisma.item.findUnique({ where: { id } });

    if (!item || item.userId !== userId || !item.url) {
      return res.status(404).json({ error: "File not found" });
    }

    // Extract the key from the saved URL
    const key = item.url.split("/").pop();
    if (!key) {
      return res.status(400).json({ error: "Invalid file URL in DB" });
    }

    const signedUrl = await getSignedFileUrl(key);
    res.json({ url: signedUrl });
  } catch (err: any) {
    console.error("getFileUrl error:", err);
    res.status(500).json({ error: err.message || "Failed to generate signed URL" });
  }
};



export const downloadFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const url = await generateDownloadLink(id);

    return res.json({ url });
  } catch (error: any) {
    console.error("Download error:", error.message);

    return res
      .status(500)
      .json({ error: error.message || "Failed to generate download link" });
  }
};

