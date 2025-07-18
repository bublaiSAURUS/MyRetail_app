"use client";
import {createContext, useContext, useState, useEffect} from "react";

// 1. Create the context
const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees from database on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = (emp) => {
    setEmployees((prev) => [...prev, emp]);
  };

  const refreshEmployees = () => {
    fetchEmployees();
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, refreshEmployees, loading }}>
      {children}
    </EmployeeContext.Provider>
  );
}