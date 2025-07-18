"use client";

import { useState } from "react";
import { useEmployeeContext } from "@/context/EmployeeContext";

export default function EmployeesPage() {
  const { employees, addEmployee, refreshEmployees, loading } = useEmployeeContext();
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    empId: "",
    salary: "",
    details: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      empId: form.empId,
      salary: parseFloat(form.salary),
      details: form.details,
    };

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empID: parseInt(newEmployee.empId), // match DB column name
          salary: newEmployee.salary,
          perDetails: newEmployee.details,
        }),
      });

      if (!res.ok) throw new Error("Failed to add employee");

      // Refresh the employees list from the database
      refreshEmployees();

      // Reset form & hide it
      setForm({ empId: "", salary: "", details: "" });
      setShowForm(false);
      
      alert("Employee added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error adding the employee.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Employees</h1>
        <p className="text-center">Loading employees...</p>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Employees</h1>

      {employees.length === 0 ? (
        <p className="text-gray-600 text-center mb-6">
          No employees registered yet.
        </p>
      ) : (
        <table className="w-full border-collapse text-left mb-6">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Salary</th>
              <th className="p-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="text-black">
                <td className="p-2 border">{emp.empid}</td>
                <td className="p-2 border">₹{emp.salary}</td>
                <td className="p-2 border">{emp.perdetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Register New Employee"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Employee ID</label>
            <input
              className="w-full border p-2 rounded text-black"
              type="text"
              name="empId"
              value={form.empId}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Salary</label>
            <input
              className="w-full border p-2 rounded text-black"
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Personal Details</label>
            <textarea
              className="w-full border p-2 rounded text-black"
              name="details"
              value={form.details}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
