// app/api/sales/route.js
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM sales ORDER BY sold_at DESC"
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error("GET /api/sales error:", error);
    return new Response("Failed to fetch sales", { status: 500 });
  }
}
