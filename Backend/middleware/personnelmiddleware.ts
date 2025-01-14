
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
declare module 'express-serve-static-core' {
  interface Request {
    personnel?: {
      id: string;
      email: string;
    };
  }
}

export const authenticateDeliveryPersonnel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('x-auth-token');
  if (!token) {
    return next(); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    req.personnel = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    return;
  }
};







