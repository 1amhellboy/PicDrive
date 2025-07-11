import { Prisma } from '@prisma/client';
import {createItem, deleteItem, getItemsByParent, renameItem} from '../services/item.service';
import {Request, Response} from 'express';


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