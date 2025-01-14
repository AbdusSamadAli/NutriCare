import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeliveryPersonnel = () => {
  const navigate = useNavigate();
  const [assignedMeals, setAssignedMeals] = useState<any[]>([]);
  const [deliveryNotes, setDeliveryNotes] = useState<string>('');
  const [selectedMealId, setSelectedMealId] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/personnelsignin'); 
    }

    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient/patients", {
          headers: { 'x-auth-token': token },
        });

        const patientMeals = response.data.map((patient: any) => {
          const status = localStorage.getItem(`mealStatus_${patient.id}`) || 'Pending';
          return {
            id: patient.id,
            recipientName: patient.name,
            roomNumber: patient.roomNumber,
            dietChart: patient.dietChart,
            status,
            deliveredAt: '',
            deliveryNotes: ''
          };
        });

        setAssignedMeals(patientMeals);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/personnelsignin');
  };

  const handleDeliveryCompletion = (mealId: string) => {
    const updatedMeals = assignedMeals.map((meal) =>
      meal.id === mealId
        ? { ...meal, status: 'Delivered', deliveryNotes, deliveredAt: new Date().toISOString() }
        : meal
    );
    setAssignedMeals(updatedMeals);
    localStorage.setItem(`mealStatus_${mealId}`, 'Delivered');
    alert('Meal marked as delivered');
  };

  const handleMealSelection = (mealId: string) => {
    setSelectedMealId(mealId);
  };

  const handleChangeNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryNotes(event.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Assigned Meal Boxes</h1>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedMeals.map((meal) => (
          <div key={meal.id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-lg font-medium">{meal.recipientName}</h2>
            <p className="text-sm">Room Number: {meal.roomNumber}</p>
            <p className="text-sm">Diet Chart: {meal.dietChart}</p>
            <p className="text-sm">Status: {meal.status}</p>

            {meal.status !== 'Delivered' && (
              <div className="mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleMealSelection(meal.id)}
                >
                  Deliver Meal
                </button>
                {selectedMealId === meal.id && (
                  <div className="mt-2">
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Add delivery notes (optional)"
                      value={deliveryNotes}
                      onChange={handleChangeNotes}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                      onClick={() => handleDeliveryCompletion(meal.id)}
                    >
                      Mark as Delivered
                    </button>
                  </div>
                )}
              </div>
            )}

            {meal.status === 'Delivered' && (
              <p className="text-sm text-green-500 mt-2">Delivered</p>
            )}
          </div>
        ))}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate('/pantry')}
      >
        Back to Pantry Portal
      </button>
    </div>
  );
};

export default DeliveryPersonnel;


