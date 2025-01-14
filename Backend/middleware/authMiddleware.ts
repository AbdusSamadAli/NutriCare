import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: String;
      username: string;
      email: string;
    };
  }
}

const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('x-auth-token');
    if (!token) {
      res.status(401).json({ msg: 'No token, authorization denied' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      req.user = {
        id: decoded.id, 
        username: decoded.username,
        email: decoded.email,
      };

      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

export default authMiddleware;



