import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FoodDietChartForm from "./FoodDietChartForm";
import PantryForm from "./PantryForm";
import PatientForm from "./PatientForm";

const ManagerPage: React.FC = () => {
  const [assignedMeals, setAssignedMeals] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/patient/patients"
        );
        const patientMeals = response.data.map((patient: any) => {
          const status = localStorage.getItem(`mealStatus_${patient.id}`) || "Pending";
          return {
            id: patient.id,
            recipientName: patient.name,
            roomNumber: patient.roomNumber,
            dietChart: patient.dietChart,
            status,
          };
        });

        setAssignedMeals(patientMeals);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePatientFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Patient form submitted");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition flex items-center gap-2"
        >
          <span>Logout</span>
        </button>
      </div>
      <header className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-semibold text-center">
          Hospital Food Management - Manager Dashboard
        </h1>
        <p className="text-center text-lg mt-2">
          Manage patients, diet charts, pantry staff, and track meal preparation & delivery.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Patient Management</h2>
          <p className="text-gray-700 mb-4">
            Manage patient details including allergies, diseases, and contact info.
          </p>
          <PatientForm onSubmit={handlePatientFormSubmit} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Food/Diet Chart Management</h2>
          <p className="text-gray-700 mb-4">
            Create and update diet charts for patients, specifying ingredients and meal plans.
          </p>
          <FoodDietChartForm />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Pantry Management</h2>
          <p className="text-gray-700 mb-4">
            Manage pantry staff, assign tasks, and track meal preparation activities.
          </p>
          <PantryForm />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
        <h2 className="text-3xl font-semibold text-blue-600 mb-8 text-center">
          Track Meal Preparation & Delivery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assignedMeals.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 shadow text-center">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">No Meal Data</h3>
              <p className="text-gray-600">No meal statuses are available yet.</p>
            </div>
          ) : (
            assignedMeals.map((meal: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  {meal.recipientName}
                </h3>
                <p className="text-gray-600">Room Number: {meal.roomNumber}</p>
                <p className="text-gray-600">Diet Chart: {meal.dietChart}</p>
                <div className="mt-4">
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      meal.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Status: {meal.status}
                  </div>
                  {meal.status === "Delivered" && (
                    <p className="text-sm text-green-500 mt-2">Delivered</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;

