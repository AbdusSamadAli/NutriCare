
import { useState } from "react";

interface MealTask {
  id: number;
  mealName: string;
  status: string;
}

const PreparationTask = ({
  mealTasks,
  setMealTasks,
  editingMeal,
  setEditingMeal,
}: {
  mealTasks: MealTask[];
  setMealTasks: React.Dispatch<React.SetStateAction<MealTask[]>>;
  editingMeal: { id: number; name: string } | null;
  setEditingMeal: React.Dispatch<React.SetStateAction<{ id: number; name: string } | null>>;
}) => {
  const [newMealName, setNewMealName] = useState("");

  const addPreparationTask = () => {
    if (!newMealName.trim()) return;
    const newTask: MealTask = {
      id: Date.now(),
      mealName: newMealName,
      status: "Pending",
    };
    setMealTasks((prevTasks) => [...prevTasks, newTask]);
    setNewMealName("");
  };

  const saveMealEdit = () => {
    if (editingMeal) {
      setMealTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingMeal.id ? { ...task, mealName: editingMeal.name } : task
        )
      );
      setEditingMeal(null);
    }
  };

  const updatePreparationTaskStatus = (id: number, newStatus: MealTask["status"]) => {
    setMealTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const deletePreparationTask = (id: number) => {
    setMealTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meal Preparation Tracker</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter meal name"
          value={newMealName}
          onChange={(e) => setNewMealName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={addPreparationTask}
          className="bg-blue-500 text-white px-4 py-1"
        >
          Add Meal
        </button>
      </div>
      <div>
        {mealTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between mb-2 border-b pb-2">
            {editingMeal && editingMeal.id === task.id ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={editingMeal.name}
                  onChange={(e) =>
                    setEditingMeal((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                  className="border px-2 py-1 mr-2 w-full"
                />
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-lg">
                  {task.mealName} - <span className="text-sm text-gray-500">{task.status}</span>
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {editingMeal && editingMeal.id === task.id ? (
                <button onClick={saveMealEdit} className="bg-green-500 text-white px-2 py-1">
                  Save
                </button>
              ) : (
                <button onClick={() => setEditingMeal({ id: task.id, name: task.mealName })} className="bg-yellow-500 text-white px-2 py-1">
                  Edit
                </button>
              )}

              <select
                value={task.status}
                onChange={(e) => updatePreparationTaskStatus(task.id, e.target.value as MealTask["status"])}
                className="border px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Prepared">Prepared</option>
              </select>

              <button
                onClick={() => deletePreparationTask(task.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreparationTask;
