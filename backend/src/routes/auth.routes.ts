import express from "express";
import {SignUp,Login,requestPasswordReset,resetPassword,refreshAcessToken,Logout } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import {
  signUpSchema,
  loginSchema,
  requestResetSchema,
  resetPasswordSchema,
  refreshSchema,
  logoutSchema
} from "../validators/auth.schema";
const router = express.Router();

router.post("/signup",validate(signUpSchema),SignUp);
router.post("/login",validate(loginSchema),Login);
router.post("/logout",authenticate,validate(logoutSchema),Logout)
router.post('/request-password-reset', validate(requestResetSchema),requestPasswordReset);
router.post('/reset-password', validate(resetPasswordSchema),resetPassword);
router.post('/refresh',validate(refreshSchema),refreshAcessToken);

export  default router;
