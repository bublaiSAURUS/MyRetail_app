"use client";

import { useState } from "react";
import { useEmployeeContext } from "@/context/EmployeeContext";

export default function EmployeesPage() {
  const { employees, addEmployee } = useEmployeeContext();
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    empId: "",
    salary: "",
    details: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      id: Date.now(),
      empId: form.empId,
      salary: parseFloat(form.salary),
      details: form.details,
    };

    addEmployee(newEmployee);
    setForm({ empId: "", salary: "", details: "" });
    setShowForm(false); // hide form after submission
  };

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
            {employees.map((emp) => (
              <tr key={emp.id} className="text-black">
                <td className="p-2 border">{emp.empId}</td>
                <td className="p-2 border">₹{emp.salary}</td>
                <td className="p-2 border">{emp.details}</td>
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
