import express from "express";
import {SignUp,Login,requestPasswordReset,resetPassword,refreshAcessToken,Logout } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/signup",SignUp);
router.post("/login",Login);
router.post("/logout",authenticate,Logout)
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('refresh',refreshAcessToken);

export  default router;
