import { NextFunction, Request, Response } from 'express';
import {registerUser, verifyUser, handlePasswordResetRequest, handlePasswordReset, logoutUser} from '../services/auth.service';
import { generateToken,generateRefreshToken } from '../utils/jwt';
import { PrismaClient } from '../generated/prisma';

import { ref } from 'process';
const prisma = new PrismaClient();

// Registers a new user and returns a token.

// export const SignUp = async (req: Request, res: Response) => {
//   try {
//     const { email, password, name } = req.body;

//     // Basic input validations before DB call
//     if(!email || !password || !name){
//       return res.status(400).json({error:'All fields are required'});
//     }
//     if (password.length < 8) {
//       return res.status(400).json({ error: 'Password must be at least 8 characters long' });
//     }

//     const user = await registerUser(email, password, name);
//     const token = generateToken(user.id);


//     res.status(201).json({ user, token });
//   } catch (err: any) {
//     console.error('Signup error:', err);

//     // Known user-facing errors
//     if (typeof err.message === 'string') {
//       if (
//         err.message.includes('already in use') ||
//         err.message.includes('must be at least')
//       ) {
//         return res.status(400).json({ error: err.message });
//       }
//     }

//     // Unknown server error
//     res.status(500).json({ error: 'Something went wrong during signup' });
//   }
// };

// export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email, password, name } = req.body;

//     // Basic validations
//     if (!email || !password || !name) {
//       const err: any = new Error('All fields are required');
//       err.statusCode = 400;
//       throw err;
//     }
//     if (password.length < 8) {
//       const err: any = new Error('Password must be at least 8 characters long');
//       err.statusCode = 400;
//       throw err;
//     }

//     const user = await registerUser(email, password, name);
//     const token = generateToken(user.id);

//     res.status(201).json({ user, token });
//   } catch (err) {
//     next(err); // Handled by errorHandler middleware
//   }
// };

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};


// Logs in a user and returns a token.

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await verifyUser(email, password);

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken();

    console.log(token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Token lifetime (minutes):", (payload.exp * 1000 - Date.now()) / 60000);

    // console.log(refreshToken);

    // Store the refresh token in the database
    await prisma.user.update({
      where:{id:user.id},
      data:{refreshToken:refreshToken}
    })

    res.status(200).json({ user, token, refreshToken });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};


// Sends a password reset link to the user's email.

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await handlePasswordResetRequest(email);
    res.json({ message: 'Reset link sent to email (check console)' });
  } catch (err) {
    res.status(404).json({ message: err instanceof Error ? err.message : 'Something went wrong' });
  }
};


// Resets the user's password.

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token, newPassword } = req.body;
    await handlePasswordReset(email, token, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Something went wrong' });
  }
};


// Generate's a new access token when one is expired using refresh token logic


export const refreshAcessToken = async (req:Request, res:Response) => {
  const {refreshToken} = req.body;
  if(!refreshToken){res.status(400).json({error:"Refresh token is required"});
  return; 
}

  const user = await prisma.user.findFirst({where:{refreshToken}})
  
  if(!user){res.status(400).json({error:"Invalid refresh token"}); 
  return;
}

  const newAcessToken = generateToken(user.id);
  res.status(200).json({accessToken:newAcessToken});
  return;
}



// Logout  

// export const Logout = async (req:Request,res:Response)=>{
//   try{
//     const userId = (req as any).user.id;
//     await logoutUser(userId);
//     res.status(200).json({message:"Logged out successfully"});
//   }catch(err:any){
//     res.status(500).json({error:err.message});
//   }
// }

export const Logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // from JWT middleware
    await logoutUser(userId);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
