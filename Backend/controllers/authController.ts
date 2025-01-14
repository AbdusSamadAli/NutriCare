import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(400).json({ msg: 'Invalid credentials' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ msg: "Email is already in use." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: "User created successfully!", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);  
    res.status(500).json({ msg: "Server error. Please try again.", error: error.message });
  }
};


