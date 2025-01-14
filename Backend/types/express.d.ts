// src/types/express.d.ts
import { User } from '../models/userModel // Adjust the import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
