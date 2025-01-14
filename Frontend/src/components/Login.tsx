import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      setSuccessMessage("Login successful! Redirecting to the manager's page...");
      setErrorMessage(""); // Clear any error messages

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate("/manager");
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.msg || "Invalid credentials. Please try again.");
      setSuccessMessage(""); // Clear any success messages
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg hover:bg-blue-50">
       <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Manager Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>

      {/* Display success or error messages */}
      {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Login;
