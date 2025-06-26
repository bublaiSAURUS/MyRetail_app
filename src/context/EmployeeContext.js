"use client";
import {createContext, useContext, useState} from "react";

// 1. Create the context
const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (emp) => {
    setEmployees((prev) => [...prev, emp]);
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}