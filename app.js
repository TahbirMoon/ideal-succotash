import { Hono } from "https://deno.land/x/hono/mod.ts";
import client from "./db/db.js";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

const app = new Hono();

// Middleware to enforce CSP & security headers
app.use('*', async (c, next) => {
  c.header(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; frame-ancestors 'none'; form-action 'self';"
  );
  c.header("X-Frame-Options", "DENY");
  c.header("X-Content-Type-Options", "nosniff");
  await next();
});

// Serve the registration form
app.get('/', async (c) => {
  return c.html(await Deno.readTextFile('./views/register.html'));
});

// Handle user registration
app.post('/', async (c) => {
  try {
    const body = await c.req.parseBody();
    const username = body.username;
    const password = body.password;
    const email = body.email;
    const role = body.role;
    const age = body.age || null;
    const consent = body.consent === "on";

    const sanitizedUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9@.]/g, '');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await client.queryArray(
      `INSERT INTO abc123_users (username, password_hash, role, email, age, consent_given)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [sanitizedUsername, hashedPassword, role, sanitizedEmail, age, consent]
    );

    return c.text('User registered successfully!');
  } catch (error) {
    console.error("Database error:", error);
    return c.text('An error occurred during registration.', 500);
  }
});

// Close database connection when server stops
app.on("stop", async () => {
  await client.end();
});

// Start server
Deno.serve(app.fetch);
