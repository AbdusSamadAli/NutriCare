import express from 'express';
import authRoutes from './routes/authRoutes';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import { signup } from './controllers/authController';
import { login } from './controllers/authController';
import patientRoutes from "./routes/patientRoutes";
import taskRoutes from './routes/taskRoutes';
import pantryStaffRoutes from './routes/pantryStaffRoutes';
import deliveryPersonnelRoute from './routes/deliveryPersonnelRoute';
import foodChartRoutes from "./routes/foodchartRoutes";
import cors from 'cors';
import { loginPantryStaff } from './controllers/pantrystaffcontroller';
import authPantryStaff from './middleware/pantrymiddleware';
import { loginDeliveryPersonnel } from './controllers/deliverypersonnelcontroller';
import { getAllTasks } from './controllers/taskcontroller';
import { authenticateDeliveryPersonnel } from './middleware/personnelmiddleware';
import { deletePatient } from './controllers/patientController';
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], 
    credentials:true
  })
);

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};
app.post('/api/auth/signup', async (req,res) => {
  try {
    await signup(req, res);  
  } catch (error) {
    console.error(error);  
    res.status(500).json({ msg: "Internal server error during signup." });
  }
});
app.post('/api/auth/login', login);
app.use('/api/auth', authRoutes);
app.use('/api', pantryStaffRoutes);
app.use('/api', taskRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api', deliveryPersonnelRoute);
app.use("/api/foodCharts", foodChartRoutes); 
app.get('/tasks', async (req, res) => {
  try {
    await getAllTasks(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assigned tasks', error: error.message });
  }
});

app.post('/api/pantry-staff/login', async(req,res)=>{
  try{
    await loginPantryStaff(req,res);
  }
  catch(error){
    res.status(500).json({ msg: "Internal server error during login." });
  }

})

app.use('/api/pantry-staff', authPantryStaff, pantryStaffRoutes);

app.post('/api/delivery-personnel/login', authenticateDeliveryPersonnel, async (req, res, next) => {
  try {
    await loginDeliveryPersonnel(req, res);
    res.json({ token: '123' });  
  } catch (error) {
    next(error);  
  }
});

app.delete('/patients/:name', async (req, res) => {
  const { name } = req.params; 
  try {
    await deletePatient(name, res); 
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'An error occurred while deleting the patient.' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World! The server is running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});


