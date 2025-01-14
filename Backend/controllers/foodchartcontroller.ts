import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFoodChart = async (req: Request, res: Response) => {
  const { name, description, items, calories } = req.body;

  try {
    const foodChart = await prisma.foodChart.create({
      data: {
        name,
        description,
        items,
        calories: parseInt(calories, 10),
      },
    });
    res.status(201).json(foodChart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food chart' });
  }
};


export const getAllFoodCharts = async (req: Request, res: Response) => {
  try {
    const foodCharts = await prisma.foodChart.findMany();
    res.status(200).json(foodCharts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food charts' });
  }
};

export const getFoodChartById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foodChart = await prisma.foodChart.findUnique({
      where: { id },
    });
    if (foodChart) {
      res.status(200).json(foodChart);
    } else {
      res.status(404).json({ error: 'Food chart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food chart' });
  }
};

export const updateFoodChart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, items, calories } = req.body;

  try {
    const foodChart = await prisma.foodChart.update({
      where: { id },
      data: {
        name,
        description,
        items,
        calories: parseInt(calories, 10),
      },
    });
    res.status(200).json(foodChart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update food chart' });
  }
};

export const deleteFoodChart = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.foodChart.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Food chart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food chart' });
  }
};
