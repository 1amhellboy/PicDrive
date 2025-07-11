import  {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface jwtPayload {
    userId: string;
}

export const authenticate = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as jwtPayload;
        req.user = {id:decoded.userId};
        next();
    } catch (error){
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
}