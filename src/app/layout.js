import "./globals.css";
import Link from "next/link";
import { ProductProvider } from "@/context/ProductContext";
import { EmployeeProvider } from "@/context/EmployeeContext";

export const metadata = {
  title: "My Retail App",
  description: "Inventory and sales tracking for local retailers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-sans">
        <ProductProvider> {/* Wrap everything inside */}
          <EmployeeProvider>
        <nav className="bg-blue-600 text-white px-6 py-4">
          <ul className="flex gap-6 text-lg font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/inventory">Inventory</Link></li>
            <li><Link href="/add-product">Add Product</Link></li>
            <li><Link href="/sell-product">Sell Product</Link></li>
            <li><Link href="/sales">Sales</Link></li>
            <li><Link href="/employees">Employees</Link></li>
          </ul>
        </nav>

        
        <main className="p-6">{children}</main>
        </EmployeeProvider> 
        </ProductProvider>
      </body>
    </html>
  );
}
