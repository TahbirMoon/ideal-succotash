import { Client } from "https://deno.land/x/postgres/mod.ts";

// Set up PostgreSQL client connection
const client = new Client({
  user: Deno.env.get("POSTGRES_USER") || "postgres",
  database: Deno.env.get("POSTGRES_DB") || "postgres",
  hostname: Deno.env.get("POSTGRES_HOST") || "localhost",
  password: Deno.env.get("POSTGRES_PASSWORD") || "Secret1234!",
  port: 5432,
  ssl: false,
});

await client.connect();
export default client;
