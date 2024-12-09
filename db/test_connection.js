import client from "./db/db.js";

const testConnection = async () => {
  try {
    const result = await client.queryArray("SELECT 1");
    console.log("Database connection successful:", result);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await client.end();
  }
};

testConnection();
