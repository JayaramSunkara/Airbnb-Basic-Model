import { MongoClient } from "mongodb";

let _db;

export async function mongoConnect() {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();

  db = client.db("airbnb");
  console.log("MongoDB connected");

  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not connected");
  return db;
}
