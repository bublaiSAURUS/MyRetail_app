// app/sales/page.js
"use client";
import { useEffect, useState } from "react";

export default function SalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch("/api/sales");
      if (res.ok) {
        const data = await res.json();
        setSales(data);
      } else {
        alert("Failed to load sales data");
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-black">Sales History</h1>
      {sales.length === 0 ? (
        <p className="text-center text-gray-500">No sales recorded yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity Sold</th>
              <th className="border px-4 py-2">Total Cost (₹)</th>
              <th className="border px-4 py-2">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="border px-4 py-2">{sale.product_name}</td>
                <td className="border px-4 py-2">{sale.quantity_sold}</td>
                <td className="border px-4 py-2">₹{sale.total_cost}</td>
                <td className="border px-4 py-2">{new Date(sale.sold_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
