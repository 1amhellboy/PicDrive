import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/email';
import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


const prisma = new PrismaClient();
const SALT_ROUNDS = 10;


// Registers a new user with the provided email, password, and optional name.

// export const registerUser = async (email: string, password: string, name?: string) => {
//   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//   try{
//     return prisma.user.create({
//     data: { email, password: hashedPassword, name },
//   }); 
//   }catch (err: any) {
//     if (err instanceof PrismaClientKnownRequestError) {
//       if (err.code === 'P2002') {
//         const target = err.meta?.target as string[] | string | undefined;
//         if (target && typeof target === 'string' && target.includes('email')) {
//           throw new Error('Email already in use');
//         }
//         if (Array.isArray(target) && target.includes('email')) {
//           throw new Error('Email already in use');
//         }
//       }
//     }
//     throw err; // fallback for other errors
//   }
// };

// export const registerUser = async (email: string, password: string, name?: string) => {
//   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//   try {
//     return await prisma.user.create({
//       data: { email, password: hashedPassword, name },
//     });
//   } catch (err: any) {
//     if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
//       const target = err.meta?.target as string[] | string | undefined;
//       if (target) {
//         const field = Array.isArray(target) ? target.join(', ') : target;
//         // Let the error handler format this
//         const customError: any = new Error(`${field} already in use`);
//         customError.statusCode = 400;
//         throw customError;
//       }
//     }
//     throw err;
//   }
// };


export const registerUser = async (email: string, password: string, name?: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    return await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
  } catch (err: any) {
    // Prisma duplicate entry
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      const target = err.meta?.target as string[] | undefined;
      const field = target?.join(', ') || 'Field';
      const customError: any = new Error(`${field} already in use`);
      customError.statusCode = 400;
      throw customError;
    }

    throw err; // Let the global errorHandler handle other issues
  }
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

// export const handlePasswordReset = async (email: string, token: string, newPassword: string) => {
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || user.resetToken !== token || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
//     throw new Error('Invalid or expired token');
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

//   await prisma.user.update({
//     where: { email },
//     data: {
//       password: hashedPassword,
//       resetToken: null,
//       resetTokenExpiry: null
//     }
//   });
// };


export const handlePasswordReset = async (email: string, token: string, newPassword: string) => {
  if (!email || !token || !newPassword) {
    throw new Error("Missing required fields");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (
    !user ||
    user.resetToken !== token ||
    !user.resetTokenExpiry ||
    user.resetTokenExpiry < new Date()
  ) {
    throw new Error("Invalid or expired token");
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