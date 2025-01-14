import express, { Request, Response } from 'express';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patientController";

const router = express.Router();

// Route for creating a patient
router.post('/patients', async (req: Request, res: Response) => {
  try {
    await createPatient(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the patient.' });
  }
});

// Route to get all patients
router.get('/patients', async (req: Request, res: Response) => {
  try {
    await getAllPatients(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching patients.' });
  }
});

// Route to get a patient by ID
router.get('/patients/:id', async (req: Request, res: Response) => {
  try {
    await getPatientById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the patient.' });
  }
});

// Route to update a patient by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await updatePatient(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the patient.' });
  }
});

router.delete('/patients/:name', async (req: Request, res: Response) => {
  const { name } = req.params; 
  try {
    await deletePatient(name, res); 
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'An error occurred while deleting the patient.' });
  }
});


export default router;



