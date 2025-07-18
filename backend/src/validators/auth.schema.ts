import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  newPassword: z.string().min(6),
});

export const requestResetSchema = z.object({
  email: z.string().email(),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const logoutSchema = z.object({
  userId: z.string().uuid(),
});
