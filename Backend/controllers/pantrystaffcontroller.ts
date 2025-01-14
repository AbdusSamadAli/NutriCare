import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

export const createPantryStaff = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, position, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const pantryStaff = await prisma.pantryStaff.create({
      data: { firstName, lastName, position, email, password: hashedPassword },
    });

    return res.status(201).json(pantryStaff);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create pantry staff' });
  }
};

export const loginPantryStaff = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const pantryStaff = await prisma.pantryStaff.findUnique({ where: { email } });

    if (!pantryStaff) {
      return res.status(404).json({ error: 'Pantry staff not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, pantryStaff.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: pantryStaff.id, role: 'PANTRY_STAFF' }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login pantry staff' });
  }
};


export const getAllPantryStaff = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pantryStaff = await prisma.pantryStaff.findMany({
      select: { id: true, firstName: true, lastName: true, position: true },
    });
    return res.status(200).json(pantryStaff);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch pantry staff' });
  }
};


