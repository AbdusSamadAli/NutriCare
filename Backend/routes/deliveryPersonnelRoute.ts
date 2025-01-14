import { Router } from 'express';
import {
  createDeliveryPersonnel,
  loginDeliveryPersonnel,
  getAllDeliveryPersonnel,
} from '../controllers/deliverypersonnelcontroller';
import { authenticateDeliveryPersonnel } from '../middleware/personnelmiddleware';
const router = Router();
router.post('/delivery-personnel', async (req, res) => {
  try {
    await createDeliveryPersonnel(req, res); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to create delivery personnel' });
  }
});

router.post('/delivery-personnel/login', authenticateDeliveryPersonnel, async (req,res,next) => {
  try {
    await loginDeliveryPersonnel(req, res);
  } catch (error) {
    next(error); 
  }
});


router.get('/delivery-personnel', async (req, res) => {
  try {
    await getAllDeliveryPersonnel(req, res);  
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch delivery personnel' });
  }
});

export default router;

