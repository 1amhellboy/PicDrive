import { PrismaClient } from '../generated/prisma';

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


// Reanme an item

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

    return result;
  } catch (error) {
    console.error('Error renaming item:', error);
    throw new Error('Failed to rename item');
  }
};


// Delete an item

export const deleteItem = async (itemId: string, userId: string) => {
  try {
    const result = await prisma.item.deleteMany({
      where: {
        id: itemId,
        userId,
      },
    });

    if (result.count === 0) {
      throw new Error('Item not found or unauthorized');
    }

    return result;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
};