import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    return Response.json(result.rows);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Only handle product addition
    if (body.name && body.category && body.price && body.quantity && body.expiryDate) {
      await pool.query(
        `INSERT INTO products (name, category, price, quantity, expiry_date)
         VALUES ($1, $2, $3, $4, $5)`,
        [body.name, body.category, body.price, body.quantity, body.expiryDate]
      );
      return new Response("Product added", { status: 200 });
    }

    return new Response("Invalid request body", { status: 400 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return new Response("Failed to add product", { status: 500 });
  }
}