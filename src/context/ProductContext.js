"use client";
import {createContext, useContext, useState} from "react";

// 1. Create the context
const ProductContext = createContext();

// 2. Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };
  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, setProducts}}>
      {children}
    </ProductContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useProductContext = () => useContext(ProductContext);