import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PantryTasks from "./PantryTasks";
import CreateDeliveryPersonnel from "./CreatePersonnel";
import PreparationTask from "./PreparationTask";
import MealTracking from "./MealTracking";

const PantryPage = () => {
  const [mealTasks, setMealTasks] = useState<any[]>([]);
  const [editingMeal, setEditingMeal] = useState<{ id: number; name: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("pantryToken");
    if (!token) {
      navigate("/staffsignin"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("pantryToken"); 
    navigate("/staffsignin"); 
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-blue-600">Pantry Management Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-12">

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <PantryTasks />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Meal Tracking</h2>
            <MealTracking />
          </section>
        </div>

        <div className="space-y-12">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <CreateDeliveryPersonnel />
          </section>
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Meal Preparation</h2>
            <PreparationTask
              mealTasks={mealTasks}
              setMealTasks={setMealTasks}
              editingMeal={editingMeal}
              setEditingMeal={setEditingMeal}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PantryPage;
