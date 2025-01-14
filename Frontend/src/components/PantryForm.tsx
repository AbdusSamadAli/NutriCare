import React, { useState } from "react";
const PantryStaffManagement = () => {
  const [staffName, setStaffName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [taskAssigned, setTaskAssigned] = useState("");
  const [staffId, setStaffId] = useState(""); // ID of the staff to assign the task
  const [taskDescription, setTaskDescription] = useState(""); // Task description field
  const [message, setMessage] = useState("");
  const [staffList, setStaffList] = useState<any[]>([]); // To store the list of staff members

  // Function to add new pantry staff
  const addStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/pantry-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: staffName,
          lastName: lastName,
          position: position,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Pantry staff ${data.firstName} created successfully!`);
        setStaffId(data.id); // Save the newly created staff ID for task assignment
        // Clear the form
        setStaffName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPosition("");
        setTaskAssigned("");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating pantry staff:", error);
      setMessage("Failed to create pantry staff.");
    }
  };

  // Function to fetch staff list
  const fetchStaffList = async () => {
    try {
      const response = await fetch("/api/pantry-staff"); // This matches the new GET route on the backend
      const data = await response.json();
      setStaffList(data);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  // Function to assign a task to a staff member
  const assignTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskAssigned || !staffId || !taskDescription) {
      setMessage(
        "Error: Both Task Name, Task Description, and Staff must be selected"
      );
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: taskAssigned,
          pantryStaffId: staffId,
          taskDescription: taskDescription, // Add task description here
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Task "${taskAssigned}" assigned successfully!`);
        setTaskAssigned("");
        setStaffId("");
        setTaskDescription(""); // Reset task description
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      setMessage("Failed to assign task.");
    }
  };

  // Fetch staff list when the component is mounted
  React.useEffect(() => {
    fetchStaffList();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Manage Pantry Staff</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* Form to add pantry staff */}
      <form onSubmit={addStaff} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Staff
        </button>
      </form>

      {/* Form to assign task */}
      <form onSubmit={assignTask} className="space-y-4 mt-8">
        <h3 className="text-lg font-semibold">Assign Task</h3>
        <div>
          <label className="block text-sm font-medium">Task Name</label>
          <input
            type="text"
            value={taskAssigned}
            onChange={(e) => setTaskAssigned(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Task Description</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Assign to Staff</label>
          <select
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="" disabled>
              Select Staff
            </option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.firstName} {staff.lastName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default PantryStaffManagement;

