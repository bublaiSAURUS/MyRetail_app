"use client";
import { useProductContext } from "@/context/ProductContext";

export default function InventoryPage() {
  const { products, deleteProduct } = useProductContext();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center text-black dark:text-white">Inventory</h1>
      {products.length === 0 ? (
        <p className="text-center">No products added yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td className="p-2 border">{prod.name}</td>
                <td className="p-2 border">{prod.category}</td>
                <td className="p-2 border">{prod.price}</td>
                <td className="p-2 border">{prod.quantity}</td>
                <td className="p-2 border">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => deleteProduct(prod.id)}>
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
