import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/email';
import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;


// Registers a new user with the provided email, password, and optional name.

export const registerUser = async (email: string, password: string, name?: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
};


// Verifies a user's credentials by checking the email and password.

export const verifyUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  return user;
};


// Request password reset — generates token and logs reset link to console.

export const handlePasswordResetRequest = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('User not found');

  const resetToken = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

  await prisma.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry: expiry
    }
  });

  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;
  sendResetEmail(email, resetLink);
};


// Resets password after token verification.

export const handlePasswordReset = async (email: string, token: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.resetToken !== token || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    throw new Error('Invalid or expired token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }
  });
};

// Logout user by setting refresh token to null

export const logoutUser = async (userId:string)=>{
  return prisma.user.update({
    where:{id:userId},
    data:{
      refreshToken:null
    }
  });
}