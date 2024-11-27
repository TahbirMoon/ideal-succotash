import { Hono } from "https://deno.land/x/hono/mod.ts";
import client from "./db/db.js";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"; // For password hashing
 
const app = new Hono();
 
// Middleware to add the CSP header with frame-ancestors directive and X-Frame-Options
app.use('*', async (c, next) => {
  c.header(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; frame-ancestors 'none';"
  );
  c.header("X-Frame-Options", "DENY"); // Alternatively, you can use "SAMEORIGIN"
  
  await next();
});
 
// Serve the registration form
app.get('/', async (c) => {
  return c.html(await Deno.readTextFile('./views/register.html'));
});
 
// Handle user registration (form submission)
app.post('/', async (c) => {
  const body = await c.req.parseBody();
  console.log(body);
  const username = body.username;
  const password = body.password;
  const email = body.email;
  const role = body.role;
  const age = body.age || null; // Optional
  const pseudonym = body.pseudonym;
  const consent = body.consent === "on"; // Checkbox is "on" if checked
 
  try {
    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    // Insert the new user into the database
    const result = await client.queryArray(
      `INSERT INTO abc123_users (username, password_hash, role, email, age, consent_given)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, hashedPassword, role, email, age, consent]
    );
 
    // Success response
    return c.text('User registered successfully!');
  } catch (error) {
    console.error(error);
    return c.text('Error during registration', 500);
  }
});
 
// Close the database connection when stopping the app
app.on("stop", async () => {
  await client.end();
});
 
// Start the application
Deno.serve(app.fetch);
