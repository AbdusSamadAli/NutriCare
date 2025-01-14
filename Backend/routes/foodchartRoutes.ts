import express from 'express';
import {
  getAllFoodCharts,
  getFoodChartById,
  createFoodChart,
  updateFoodChart,
  deleteFoodChart,
} from '../controllers/foodchartcontroller';

const router = express.Router();
router.get('/', getAllFoodCharts);
router.get('/:id', getFoodChartById);
router.post('/', createFoodChart);
router.put('/:id', updateFoodChart);
router.delete('/:id', deleteFoodChart);

export default router;

