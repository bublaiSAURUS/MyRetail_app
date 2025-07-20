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

    const totalCost = product.price * quantity;

    // Insert into sales table
    await pool.query(
      `INSERT INTO sales (product_id, product_name, quantity_sold, total_cost)
       VALUES ($1, $2, $3, $4)`,
      [id, product.name, quantity, totalCost]
    );

    // Update or delete product
    if (quantity === product.quantity) {
      await pool.query("DELETE FROM products WHERE id = $1", [id]);
    } else {
      await pool.query(
        "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
        [quantity, id]
      );
    }

    return new Response("Product sold and recorded", { status: 200 });
  } catch (error) {
    console.error("POST /api/sell error:", error);
    return new Response("Server error", { status: 500 });
  }
}
