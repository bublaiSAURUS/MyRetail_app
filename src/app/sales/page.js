"use client"

import { useProductContext } from "@/context/ProductContext";

export default function SalesPage()
{
    const { sales } = useProductContext();
    
    return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Sales History</h1>

      {sales.length === 0 ? (
        <p className="text-center text-gray-600">No sales recorded yet.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-2 border">Product ID</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="text-black">
                <td className="p-2 border">{sale.productId}</td>
                <td className="p-2 border">{sale.productName}</td>
                <td className="p-2 border">{sale.quantity}</td>
                <td className="p-2 border">₹{sale.price}</td>
                <td className="p-2 border">₹{sale.total}</td>
                <td className="p-2 border">{sale.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}