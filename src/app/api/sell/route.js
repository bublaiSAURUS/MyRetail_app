// app/api/sell/route.js
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { id, quantity } = await req.json();

    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    const product = result.rows[0];

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    if (quantity > product.quantity) {
      return new Response("Not enough stock", { status: 400 });
    }

    if (quantity === product.quantity) {
      await pool.query("DELETE FROM products WHERE id = $1", [id]);
    } else {
      await pool.query(
        "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
        [quantity, id]
      );
    }

    return new Response("Product sold", { status: 200 });
  } catch (error) {
    console.error("POST /api/sell error:", error);
    return new Response("Server error", { status: 500 });
  }
}
