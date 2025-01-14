import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateDeliveryPersonnel = () => {
  const [deliveryPersonnel, setDeliveryPersonnel] = useState<any[]>([]);
  const [newPersonnel, setNewPersonnel] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchDeliveryPersonnel = async () => {
      try {
        const response = await fetch("/api/delivery-personnel");
        if (!response.ok) {
          throw new Error("Failed to fetch delivery personnel");
        }
        const data = await response.json();
        setDeliveryPersonnel(data);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching delivery personnel:", error);
      }
    };
    fetchDeliveryPersonnel();
  }, []);

  const handleAddPersonnel = async () => {
    try {
      const response = await fetch("/api/delivery-personnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPersonnel),
      });
      if (response.ok) {
        alert("Personnel added successfully");
        setNewPersonnel({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
        });
        const updatedData = await response.json();
        setDeliveryPersonnel((prev) => [...prev, updatedData]);
      } else {
        throw new Error("Failed to add personnel");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding personnel");
    }
  };
  const navigate = useNavigate();
  const handleLoginAsDeliveryPersonnel = async (email:string, password:string) => {
    try {
        const response = await fetch(`/api/delivery-personnel/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        const { token } = data;
  
        localStorage.setItem('token', token);
        console.log('Login successful:', data);
  
        navigate('/deliverypersonnel');
      } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold">Delivery Personnel</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul className="mt-4 space-y-2">
        {deliveryPersonnel.map((person) => (
          <li
            key={person.id}
            className="p-4 bg-gray-100 rounded shadow-md flex justify-between"
          >
            <span>
              {person.firstName} {person.lastName}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleLoginAsDeliveryPersonnel(person.id)}
            >
              Login as Delivery Personnel
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="font-semibold">Add New Personnel</h3>
        <input
          type="text"
          placeholder="First Name"
          value={newPersonnel.firstName}
          onChange={(e) =>
            setNewPersonnel({ ...newPersonnel, firstName: e.target.value })
          }
          className="block mt-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newPersonnel.lastName}
          onChange={(e) =>
            setNewPersonnel({ ...newPersonnel, lastName: e.target.value })
          }
          className="block mt-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newPersonnel.phone}
          onChange={(e) =>
            setNewPersonnel({ ...newPersonnel, phone: e.target.value })
          }
          className="block mt-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newPersonnel.email}
          onChange={(e) =>
            setNewPersonnel({ ...newPersonnel, email: e.target.value })
          }
          className="block mt-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newPersonnel.password}
          onChange={(e) =>
            setNewPersonnel({ ...newPersonnel, password: e.target.value })
          }
          className="block mt-2 p-2 border rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleAddPersonnel}
        >
          Add Personnel
        </button>
      </div>
    </section>
  );
};

export default CreateDeliveryPersonnel;

