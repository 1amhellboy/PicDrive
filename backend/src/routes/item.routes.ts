import express from "express";
import { create, getByParent, rename, remove, shareItem, accessSharedItem, uploadFile, trashItem, getTrash, restore, clearTrash,uploadFolder, getFileUrl,downloadFile, sharedItem, getSharedWithMe,getRecentItemsController, getStarred, starItem, getStoreageUsage,requestDataExport } from '../controllers/item.controller';
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { CreateItemSchema,RenameItemSchema,DeleteItemSchema,ShareItemSchema,GetItemsSchema } from "../validators/item.schema";
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();


router.get("/export", authenticate, requestDataExport)
router.patch("/:id/star", authenticate, starItem);
router.get("/starred/me", authenticate, getStarred);
router.get("/recent", authenticate, getRecentItemsController);
router.get("/storage", authenticate, getStoreageUsage)
router.post('/', authenticate,validate(CreateItemSchema), create);
router.get("/:id/download", authenticate ,downloadFile);
router.patch("/:id/restore", authenticate, restore);
router.patch("/:id/trash", authenticate, trashItem);
router.get("/:id/url", authenticate, getFileUrl);
router.get("/trash", authenticate, getTrash);
router.delete("/trash/empty", authenticate, clearTrash);
router.get('/:parentId', authenticate,validate(GetItemsSchema), getByParent);
router.patch('/:id', authenticate, rename);
router.delete('/:id', authenticate, remove);
router.get("/shared/me", authenticate, getSharedWithMe);
router.get("/shared", authenticate, sharedItem);
router.post("/share",authenticate,validate(ShareItemSchema),shareItem);
router.get('/share/:id',authenticate,validate(DeleteItemSchema),accessSharedItem); 
router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.post("/upload-folder",authenticate,upload.array("files"),uploadFolder);  // multiple files (with relative paths)uploadFolder



export  default router;