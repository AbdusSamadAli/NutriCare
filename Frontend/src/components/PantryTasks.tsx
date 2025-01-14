// PantryTasks.tsx
import { useState, useEffect } from "react";
import axios from "axios";
const PantryTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks"); // The API endpoint using axios
        setTasks(response.data); // Set tasks to the state
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold">Pantry Tasks</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="mt-4 space-y-4">
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 bg-gray-100 rounded shadow-md flex justify-between"
              >
                <span>
                  {task.taskName} - {task.taskDescription}
                </span>
              </li>
            ))
          ) : (
            <p>No tasks assigned yet.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default PantryTasks;
