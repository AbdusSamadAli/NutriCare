import { useState, useEffect } from "react";
import axios from "axios";

const MealTracking = () => {
  const [assignedMeals, setAssignedMeals] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/patient/patients"
        );
        console.log("Fetched Patients:", response.data); 
        const patientMeals = response.data.map((patient: any) => {
          const status =
            localStorage.getItem(`mealStatus_${patient.id}`) || "Pending";
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Track Meal Preparation & Delivery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assignedMeals.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold text-blue-500 mb-2">
              No Meal Data
            </h3>
            <p className="text-gray-600">
              No meal statuses are available yet.
            </p>
          </div>
        ) : (
          assignedMeals.map((meal: any, index: number) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 shadow">
              <h3 className="text-lg font-bold text-blue-500 mb-2">
                {meal.recipientName}
              </h3>
              <p className="text-gray-600">
                Room Number: {meal.roomNumber}
              </p>
              <p className="text-gray-600">
                Diet Chart: {meal.dietChart}
              </p>
              <div className="mt-4">
                <div
                  className={`p-2 rounded-lg text-sm ${
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
  );
};

export default MealTracking;
