import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const JWT_SECRET = process.env.JWT_SECRET!;

// Function to generate a JWT token for a user

export const generateToken = (userId:string)=>{
    return jwt.sign({userId},JWT_SECRET,{expiresIn:'1h'});
}

// Function to verify a JWT token and return the decoded payload

export const verifyToken = (token:string)=>{
    return jwt.verify(token,JWT_SECRET)
}

// Function to generate a refresh token (not a jwt)

export const generateRefreshToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

