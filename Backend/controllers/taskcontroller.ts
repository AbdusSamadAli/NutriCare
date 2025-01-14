import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
export const createTask = async (req: Request, res: Response): Promise<Response> => {
  const { taskName, taskDescription, pantryStaffId } = req.body;
  if (!taskName || !taskDescription || !pantryStaffId) {
    return res.status(400).json({ error: 'Missing required fields: taskName, taskDescription, or pantryStaffId' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        taskName,
        taskDescription,
        pantryStaffId,  
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getAllTasks = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = await prisma.task.findMany();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get a task by ID
export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (task) {
      return res.json(task);
    } else {
      return res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const getAssignedTasks = async (req: Request, res: Response) => {
  const { id: deliveryPersonnelId } = req.personnel;  
  if (!deliveryPersonnelId) {
    return res.status(400).json({ error: 'Invalid delivery personnel ID' });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        id: deliveryPersonnelId, 
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
};

export const assignTaskToDeliveryPersonnel = async (req: Request, res: Response) => {
  const { taskId, deliveryPersonnelId } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { deliveryPersonnelId },
    });

    res.status(200).json(task);
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ error: 'Failed to assign task.' });
  }
};  