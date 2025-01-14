import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

export const createDeliveryPersonnel = async (req: Request, res: Response) => {
  const { firstName, lastName, phone, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const deliveryPersonnel = await prisma.deliveryPersonnel.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(deliveryPersonnel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create delivery personnel' });
  }
};

export const loginDeliveryPersonnel = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const deliveryPersonnel = await prisma.deliveryPersonnel.findUnique({
      where: { email },
    });

    if (!deliveryPersonnel) {
      return res.status(404).json({ error: 'Delivery personnel not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, deliveryPersonnel.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: deliveryPersonnel.id, email: deliveryPersonnel.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login delivery personnel' });
  }
};

export const getAllDeliveryPersonnel = async (req: Request, res: Response) => {
  try {
    const deliveryPersonnel = await prisma.deliveryPersonnel.findMany();
    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch delivery personnel' });
  }
};




