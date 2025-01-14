// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PatientForm from "./components/PatientForm";
import FoodDietChartForm from "./components/FoodDietChartForm";
import PantryForm from "./components/PantryForm";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ManagerPage from "./components/Managerpage";
import PantryPage from "./components/Pantrypage";
import Home from "./components/Home";
import DeliveryPersonnel from "./components/DeliveryPersonnel";
import PreparationTask from "./components/PreparationTask";
import PantryTasks from "./components/PantryTasks";
import CreateDeliveryPersonnel from "./components/CreatePersonnel";
import MealTracking from "./components/MealTracking";
import SignInPantryStaff from "./components/PantrySignin";
import DeliveryPersonnelDashboard from "./components/PersonnelSignin";
const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/patient-form" element={<PatientForm onSubmit={(data) => console.log(data)} />} />
          <Route path="/food-diet-chart-form" element={<FoodDietChartForm onSubmit={(data) => console.log(data)} />} />
          <Route path="/pantry-form" element={<PantryForm onSubmit={(data) => console.log(data)} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/deliverypersonnel" element={<DeliveryPersonnel />} />
          <Route path="/preparationtask" element={<PreparationTask />} />
          <Route path="/pantrytask" element={<PantryTasks />} />
          <Route path="/createpersonnel" element={<CreateDeliveryPersonnel />} />
          <Route path="/mealtrack" element={<MealTracking />} />
          <Route path="/staffsignin" element={<SignInPantryStaff />} />
          <Route path="/personnelsignin" element={<DeliveryPersonnelDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

