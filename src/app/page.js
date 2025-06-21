"use client";
import { useProductContext } from "@/context/ProductContext";
import Image from "next/image";

export default function HomePage() {
  const { products } = useProductContext();

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + Number(p.quantity), 0);
  const totalValue = products.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity), 0);
  const lowStockItems = products.filter((p) => p.quantity < 10);

  return (
    <div className="text-black">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">MyRetail</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Your one-stop solution to manage your business — all in one place.
        </p>
        <div className="mt-8">
          <Image
            src="/app_logo.jpg"
            alt="Dashboard Graphic"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="max-w-4xl mx-auto mt-16 px-6 pb-12">
        <h2 className="text-3xl font-bold text-center mb-10">Inventory Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Total Products</h3>
            <p className="text-2xl">{totalProducts}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Total Quantity</h3>
            <p className="text-2xl">{totalQuantity}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow col-span-1 sm:col-span-2">
            <h3 className="text-xl font-semibold">Inventory Value</h3>
            <p className="text-2xl">₹{totalValue}</p>
          </div>
        </div>

        {lowStockItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-red-600"> Low Stock Items</h3>
            <ul className="list-disc list-inside">
              {lowStockItems.map((item) => (
                <li key={item.id}>
                  {item.name} — only {item.quantity} left
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
