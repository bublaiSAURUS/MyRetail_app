"use client"

import { useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

export default function SellProductPage(){

    const { products, setProducts } = useProductContext();
    const [selectedId, setSelectedId] = useState("");
    const [quantitySold, setQuantitySold] = useState("");
    const router = useRouter();

    const handleSell = (e) => {
    e.preventDefault();

    const isInventoryEmpty = products.length === 0;

    const index = products.findIndex(p => p.id === parseInt(selectedId));
    if (index == -1) return;
    const product = products[index];
    
    if (quantitySold > product.quantity) {
      alert("Not enough stock.");
      return;
    }

    const updatedProduct = {
      ...product,
      quantity: product.quantity - quantitySold
    };

    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;

    setProducts(updatedProducts);
    setSelectedId("");
    setQuantitySold("");
    router.push("/inventory");
    };

return (
  <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md text-black">
    <h1 className="text-2xl font-bold mb-6 text-center">Sell a Product</h1>

    {products.length === 0 ? (
      <p className="text-center text-gray-600">
        No products available to sell. Please{" "}
        <a href="/add-product" className="text-blue-600 underline">
          add a product
        </a>{" "}
        first.
      </p>
    ) : (
      <form onSubmit={handleSell} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Product</label>
          <select
            className="w-full border p-2 rounded text-black"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
          >
            <option value="">-- Choose a product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Stock: {product.quantity})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity Sold</label>
          <input
            className="w-full border p-2 rounded text-black"
            type="number"
            min="1"
            value={quantitySold}
            onChange={(e) => setQuantitySold(parseInt(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Record Sale
        </button>
      </form>
    )}
  </div>
);
}