import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM employee ORDER BY empid ASC");
    return Response.json(result.rows);
  } catch (error) {
    console.error("GET /api/employees error:", error);
    return new Response("Failed to fetch employees", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { empID, salary, perDetails } = body;

    if (!empID || !salary || !perDetails) {
      return new Response("Missing required fields", { status: 400 });
    }

    await pool.query(
      `INSERT INTO employee (empid, salary, perdetails)
       VALUES ($1, $2, $3)`,
      [empID, salary, perDetails]
    );
    
    return new Response("Employee added successfully", { status: 200 });
  } catch (error) {
    console.error("POST /api/employees error:", error);
    return new Response("Failed to add employee", { status: 500 });
  }
}
