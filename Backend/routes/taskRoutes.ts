import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  assignTaskToDeliveryPersonnel,
  getAssignedTasks
} from '../controllers/taskcontroller';
import { authenticateDeliveryPersonnel } from '../middleware/personnelmiddleware';
const router: Router = Router();

router.post('/tasks', async (req, res) => {
  await createTask(req, res);
});

router.get('/tasks', async (req, res) => {
  await getAllTasks(req, res);
});

router.put('/tasks/assign', async(req,res)=>{
  await assignTaskToDeliveryPersonnel(req,res);
})
router.get('/tasks/assigned', async (req, res) => {
  await authenticateDeliveryPersonnel(req, res, async () => {
    await getAssignedTasks(req, res);
  });
});
router.put('/tasks/assign', async (req, res) => {
  await authenticateDeliveryPersonnel(req, res, async () => {
    await assignTaskToDeliveryPersonnel(req, res);
  });
});

export default router;
