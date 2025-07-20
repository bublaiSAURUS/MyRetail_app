import pool from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const id = params.id;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return new Response("Not found", { status: 404 });
    }
    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/products/:id error:", error);
    return new Response("Server error", { status: 500 });
  }
}
    