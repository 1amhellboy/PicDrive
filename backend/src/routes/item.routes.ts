import express from "express";
import { create, getByParent, rename, remove, shareItem, accessSharedItem } from '../controllers/item.controller';
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post('/', authenticate, create);
router.get('/:parentId', authenticate, getByParent);
router.patch('/:id', authenticate, rename);
router.delete('/:id', authenticate, remove);
router.post("/share",authenticate,shareItem);
router.get('/share/:id', accessSharedItem); 

export  default router;