import  {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface jwtPayload {
    userId: string;
}

// export const authenticate = (req:Request,res:Response,next:NextFunction) => {
//     const authHeader = req.headers.authorization;
//     console.log('Auth Header:', authHeader);
//     if(!authHeader || !authHeader.startsWith('Bearer ')) {
//         res.status(401).json({message: 'Unauthorized'});
//         return;
//     }
//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET!) as jwtPayload;
//         console.log('✅ Token verified:', decoded);
//         req.user = {id:decoded.userId};
//         next();
//     } catch (error){
//         res.status(401).json({ message: 'Invalid or expired token' });
//         return;
//     }
// }


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("❌ No token or bad format");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔑 Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;
    console.log("✅ Token verified:", decoded);
    req.user = { id: decoded.userId };
    next();
  } catch (error: any) {
    console.error("❌ JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

