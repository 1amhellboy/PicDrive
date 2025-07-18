// src/validators/item.schema.ts
import { z } from "zod";

export const CreateItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["file", "folder"]),
  userId: z.string().uuid(),
  parentId: z.string().uuid().nullable().optional(),
  mimeType: z.string().optional(),
  size: z.number().int().positive().optional(),
  url: z.string().url().optional()
});

export const RenameItemSchema = z.object({
  itemId: z.string().uuid(),
  name: z.string().min(1, "New name is required"),
  userId: z.string().uuid()
});

export const DeleteItemSchema = z.object({
  id: z.string().uuid(), // matches req.params.id
});

export const ShareItemSchema = z.object({
  userId: z.string().uuid(),
  itemId: z.string().uuid(),
  sharedWith: z.string().email().optional(), // optional if public
  isPublic: z.boolean(),
  permission: z.enum(["viewer", "editor"])
});

export const GetItemsSchema = z.object({
  parentId: z.string().uuid().nullable(),
  userId: z.string().uuid()
});
