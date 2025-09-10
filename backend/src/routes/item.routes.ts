import express from "express";
import { create, getByParent, rename, remove, shareItem, accessSharedItem, uploadFile } from '../controllers/item.controller';
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { CreateItemSchema,RenameItemSchema,DeleteItemSchema,ShareItemSchema,GetItemsSchema } from "../validators/item.schema";
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

router.post('/', authenticate,validate(CreateItemSchema), create);
// router.get('/', authenticate, async (req, res) => {
//   try {
//     // inject parentId = null and forward to controller
//     req.params.parentId = null as any;
//     await getByParent(req, res);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message || "Failed to fetch root items" });
//   }
// });

router.get('/:parentId', authenticate,validate(GetItemsSchema), getByParent);
router.patch('/:id', authenticate,validate(RenameItemSchema), rename);
router.delete('/:id', authenticate, remove);
router.post("/share",authenticate,validate(ShareItemSchema),shareItem);
router.get('/share/:id',authenticate,validate(DeleteItemSchema),accessSharedItem); 
router.post('/upload', authenticate, upload.single('file'), uploadFile);

export  default router;