import { Prisma } from '@prisma/client';
import {createItem, deleteItem, getItemsByParent, renameItem, createShare, getShared} from '../services/item.service';
import {Request, Response} from 'express';
import { userInfo } from 'os';


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
export const getByParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: userId missing' });
      return;
    }

    const items = await getItemsByParent(parentId === 'root' ? null : parentId, userId);
    res.status(200).json(items);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to fetch items' });
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
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: userId missing' });
      return;
    }

    await deleteItem(id, userId);
    res.status(204).json({ message: 'Item deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to delete item' });
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
