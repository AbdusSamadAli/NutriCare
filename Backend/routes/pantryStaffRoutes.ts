import { Router, Request, Response } from 'express';
import { createPantryStaff, loginPantryStaff, getAllPantryStaff } from '../controllers/pantrystaffcontroller';

const router = Router();

// Route for creating pantry staff (Sign-up)
router.post('/pantry-staff', async (req: Request, res: Response) => {
  await createPantryStaff(req, res);
});

// Route for pantry staff login (Sign-in)
router.post('/pantry-staff/login', async (req: Request, res: Response) => {
  await loginPantryStaff(req, res);
});

// Route to fetch all pantry staff (protected route, only accessible by authorized staff)
router.get('/pantry-staff', async (req: Request, res: Response) => {
  await getAllPantryStaff(req, res);
});

export default router;
