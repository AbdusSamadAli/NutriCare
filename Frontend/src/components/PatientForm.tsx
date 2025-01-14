import React, { useState, useEffect } from "react";
import axios from "axios";

interface Patient {
  _id: string;
  name: string;
  diseases: string;
  allergies: string;
  roomNumber: number;
  bedNumber: number;
  floorNumber: number;
  age: number;
  gender: "M" | "F";
  contactInformation: string;
  emergencyContact: string;
}

const PatientForm: React.FC = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "M",
    contactInformation: "",
    emergencyContact: "",
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient/patients");
        console.log("Fetched Patients:", response.data); // Debugging
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedData = {
      ...patientData,
      roomNumber: parseInt(patientData.roomNumber, 10),
      bedNumber: parseInt(patientData.bedNumber, 10),
      floorNumber: parseInt(patientData.floorNumber, 10),
      age: parseInt(patientData.age, 10),
    };

    try {
      setLoading(true);
      if (selectedId) {
        // Update patient
        const response = await axios.put(
          `http://localhost:5000/api/patient/patients/${selectedId}`,
          parsedData,
          { headers: { "Content-Type": "application/json" } }
        );
        setPatients((prev) =>
          prev.map((patient) =>
            patient._id === selectedId ? response.data : patient
          )
        );
        setSuccess("Patient updated successfully.");
      } else {
        // Create new patient
        const response = await axios.post(
          "http://localhost:5000/api/patient/patients",
          parsedData,
          { headers: { "Content-Type": "application/json" } }
        );
        setPatients((prev) => [...prev, response.data]);
        setSuccess("Patient created successfully.");
      }
      setPatientData({
        name: "",
        diseases: "",
        allergies: "",
        roomNumber: "",
        bedNumber: "",
        floorNumber: "",
        age: "",
        gender: "M",
        contactInformation: "",
        emergencyContact: "",
      });
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      setError("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (patient: Patient) => {
    setSelectedId(patient._id);
    setPatientData({
      name: patient.name,
      diseases: patient.diseases,
      allergies: patient.allergies,
      roomNumber: patient.roomNumber.toString(),
      bedNumber: patient.bedNumber.toString(),
      floorNumber: patient.floorNumber.toString(),
      age: patient.age.toString(),
      gender: patient.gender,
      contactInformation: patient.contactInformation,
      emergencyContact: patient.emergencyContact,
    });
  };

  const handleDelete = async (name: string | undefined) => {
    // Validate if name is provided
    if (!name) {
      console.error('Invalid name passed to handleDelete:', name);
      alert('Cannot delete. Patient name is missing.');
      return; // Exit the function if the name is invalid
    }
  
    console.log('Deleting patient with name:', name); // Debugging log for valid name
  
    try {
      // Make the DELETE request using fetch
      const response = await fetch(`http://localhost:5000/patients/${name}`, {
        method: 'DELETE',
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }
  
      // Update the patient list after successful deletion
      setPatients((prev) => prev.filter((patient) => patient.name !== name));
      alert('Patient deleted successfully!');
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient. Please try again.');
    }
  };
  
  
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Patient Management</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="diseases"
            value={patientData.diseases}
            onChange={handleChange}
            placeholder="Diseases"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="allergies"
            value={patientData.allergies}
            onChange={handleChange}
            placeholder="Allergies"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="roomNumber"
            value={patientData.roomNumber}
            onChange={handleChange}
            placeholder="Room Number"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="bedNumber"
            value={patientData.bedNumber}
            onChange={handleChange}
            placeholder="Bed Number"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="floorNumber"
            value={patientData.floorNumber}
            onChange={handleChange}
            placeholder="Floor Number"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="age"
            value={patientData.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-2 border rounded"
          />
          <select
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <input
            type="text"
            name="contactInformation"
            value={patientData.contactInformation}
            onChange={handleChange}
            placeholder="Contact Information"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="emergencyContact"
            value={patientData.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency Contact"
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {selectedId ? "Update Patient" : "Create Patient"}
        </button>
      </form>
      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mt-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Patient List</h2>
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Room</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b">
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.roomNumber}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    {" "}
                    Edit{" "}
                  </button>{" "}
                  <button onClick={() => handleDelete(patient.name)}>Delete</button>
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>
  );
};

export default PatientForm;
