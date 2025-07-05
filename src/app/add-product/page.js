"use client";
import { useState } from "react";
// import { useProductContext } from "@/context/ProductContext";
import { useRouter } from "next/navigation";



export default function AddProduct() {

  // const { addProduct } = useProductContext();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addProduct({ ...form, id: Date.now() });
  //   setForm({ name: "", category: "", price: "", quantity: "",  expiryDate: ""});
  //   router.push("/inventory");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Product added!");
      setForm({ name: "", category: "", price: "", quantity: "", expiryDate: "" });
      router.push("/inventory");
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-black">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded text-black"
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded text-black"
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded text-black"
          type="number"
          name="price"
          placeholder="Price per Unit"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded text-black"
          type="number"
          name="quantity"
          placeholder="Quantity in Stock"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded text-black"
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
