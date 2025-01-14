import React, { useState, useEffect } from 'react';

interface FoodDietChart {
  id: string;
  name: string;
  description: string;
  items: string[];
  calories: number;
}

const FoodDietChartForm: React.FC = () => {
  const [dietData, setDietData] = useState({
    name: '',
    description: '',
    items: '',
    calories: 0,
  });

  const [foodCharts, setFoodCharts] = useState<FoodDietChart[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    fetchFoodCharts();
  }, []);

  const fetchFoodCharts = async () => {
    try {
      const response = await fetch('/api/foodCharts');
      if (response.ok) {
        const data = await response.json();
        setFoodCharts(data);
      } else {
        setMessage('Failed to fetch food charts');
      }
    } catch (error) {
      setMessage('Error fetching food charts');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDietData({ ...dietData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemsArray = dietData.items.split(',').map(item => item.trim());

    const chartData = {
      name: dietData.name,
      description: dietData.description,
      items: itemsArray,
      calories: dietData.calories,
    };

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/foodCharts/${editingId}` : '/api/foodCharts';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chartData),
      });

      if (response.ok) {
        const updatedFoodChart = await response.json();
        setMessage(isEditing ? 'Food chart updated successfully' : 'Food chart created successfully');
        fetchFoodCharts(); 
        resetForm();
      } else {
        setMessage('Failed to save food chart');
      }
    } catch (error) {
      setMessage('Error submitting the form');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/foodCharts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Food chart deleted successfully');
        fetchFoodCharts();
      } else {
        setMessage('Failed to delete food chart');
      }
    } catch (error) {
      setMessage('Error deleting food chart');
    }
  };
  const handleEdit = (chart: FoodDietChart) => {
    setDietData({
      name: chart.name,
      description: chart.description,
      items: chart.items.join(', '),
      calories: chart.calories,
    });
    setIsEditing(true);
    setEditingId(chart.id);
  };

  const resetForm = () => {
    setDietData({
      name: '',
      description: '',
      items: '',
      calories: 0,
    });
    setIsEditing(false);
    setEditingId('');
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">{isEditing ? 'Edit Food Chart' : 'Create Food Chart'}</h2>
      {message && <div className="mb-4 text-center text-red-500">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={dietData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={dietData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Items (comma separated)</label>
          <input
            type="text"
            name="items"
            value={dietData.items}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Calories</label>
          <input
            type="number"
            name="calories"
            value={dietData.calories}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Update Food Chart' : 'Create Food Chart'}
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Food Chart List</h3>
        {foodCharts.length > 0 ? (
          <ul>
            {foodCharts.map(chart => (
              <li key={chart.id} className="border-b py-4">
                <h4 className="text-lg font-semibold">{chart.name}</h4>
                <p className="text-sm">{chart.description}</p>
                <p className="text-sm">Items: {chart.items.join(', ')}</p>
                <p className="text-sm">Calories: {chart.calories}</p>
                <div className="mt-2">
                  <button
                    onClick={() => handleEdit(chart)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(chart.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No food charts available</p>
        )}
      </div>
    </div>
  );
};

export default FoodDietChartForm;

