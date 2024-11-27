import { Client } from "https://deno.land/x/postgres/mod.ts";
 
// Set up PostgreSQL client connection
const client = new Client({
  user: "postgres",
  database: "postgres",  // Replace with your actual database name
  hostname: "localhost",
  password: "Secret1234!",          // Replace with your actual password
  port: 5432,
  ssl: true,
});
await client.connect();
export default client;