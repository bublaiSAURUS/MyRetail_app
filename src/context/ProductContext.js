"use client";
import {createContext, useContext, useState} from "react";

// 1. Create the context
const ProductContext = createContext();

// 2. Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const recordSale = ({ productId, productName, quantity, price }) => {
  const newSale = {
    id: Date.now(),
    productId,
    productName,
    quantity,
    price,
    total: quantity * price,
    timestamp: new Date().toLocaleString()
  };
  setSales((prev) => [...prev, newSale]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, setProducts, sales, recordSale}}>
      {children}
    </ProductContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useProductContext = () => useContext(ProductContext);