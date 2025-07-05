import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_retail_app",
  password: "fishman",
  port: 5432,
});

export default pool;
