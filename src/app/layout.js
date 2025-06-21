import "./globals.css";
import Link from "next/link";
import { ProductProvider } from "@/context/ProductContext";

export const metadata = {
  title: "My Retail App",
  description: "Inventory and sales tracking for local retailers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-sans">
        <ProductProvider> {/* Wrap everything inside */}
        <nav className="bg-blue-600 text-white px-6 py-4">
          <ul className="flex gap-6 text-lg font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/inventory">Inventory</Link></li>
            <li><Link href="/add-product">Add Product</Link></li>
          </ul>
        </nav>
        <main className="p-6">{children}</main>
        </ProductProvider>
      </body>
    </html>
  );
}
