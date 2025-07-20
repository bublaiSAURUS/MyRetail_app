"use client";
import { useState } from "react";

export default function SellProduct() {
  const [productId, setProductId] = useState("");
  const [sellQuantity, setSellQuantity] = useState("");
  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${productId}`);
    if (res.ok) {
      const data = await res.json();
      setProduct(data);
    } else {
      alert("Product not found.");
    }
  };

  const calculateTotal = () => {
    if (product && sellQuantity) {
      setTotalPrice(product.price * parseInt(sellQuantity));
    }
  };

  const handleSell = async () => {
    const res = await fetch(`/api/sell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, quantity: parseInt(sellQuantity) }),
    });

    if (res.ok) {
      alert("Product sold!");
      setProduct(null);
      setProductId("");
      setSellQuantity("");
      setTotalPrice(0);
    } else {
      alert("Failed to sell product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-black">Sell Product</h1>
      <input
        className="border p-2 rounded mb-4 w-full text-black"
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={fetchProduct}>
        Fetch Product
      </button>

      {product && (
        <div className="mt-4">
          <p>Name: {product.name}</p>
          <p>Unit Price: ₹{product.price}</p>
          <p>Available Quantity: {product.quantity}</p>

          <input
            className="border p-2 rounded mt-2 w-full text-black"
            type="number"
            placeholder="Quantity to Sell"
            value={sellQuantity}
            onChange={(e) => {
              setSellQuantity(e.target.value);
              calculateTotal();
            }}
          />

          <p className="mt-2">Total Price: ₹{totalPrice}</p>

          <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded" onClick={handleSell}>
            Sell Product
          </button>
        </div>
      )}
    </div>
  );
}
