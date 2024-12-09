import { Client } from "https://deno.land/x/postgres/mod.ts";

// Set up PostgreSQL client connection
const client = new Client({
  user: "postgres",  // Your PostgreSQL username
  database: "booking_system_database",  // Change this to your database name
  hostname: "localhost",  // Ensure this matches your local database configuration
  password: "Secret1234!",  // Your database password
  port: 5432,  // Default PostgreSQL port
  ssl: false,  // Set false unless SSL is configured
});

await client.connect();
export default client;
