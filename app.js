import { Hono } from "https://deno.land/x/hono/mod.ts";
import client from "./db/db.js";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

// Initialize the Hono app
const app = new Hono();

// Middleware to secure headers
app.use('*', async (c, next) => {
  c.header(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; frame-ancestors 'none';"
  );
  c.header("X-Frame-Options", "DENY");
  await next();
});

// Serve the registration page
app.get('/', async (c) => {
  return c.html(await Deno.readTextFile('./views/register.html'));
});

// Handle user registration securely with parameterized query
app.post('/', async (c) => {
  const body = await c.req.parseBody();
  const username = body.username;
  const password = body.password;
  const email = body.email;
  const role = body.role;
  const age = body.age || null;
  const consent = body.consent === "on";

  try {
    // Hash the password securely with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Use parameterized query to prevent SQL Injection
    const result = await client.queryArray(
      `INSERT INTO abc123_users (username, password_hash, role, email, age, consent_given) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, hashedPassword, role, email, age, consent]
    );

    return c.text('User registered successfully!');
  } catch (error) {
    console.error("Error during registration:", error);
    return c.text('Error during registration', 500);
  }
});

// Cleanup database connection on app stop
app.on("stop", async () => {
  await client.end();
});

// Start the server and listen for requests
Deno.serve(app.fetch);
