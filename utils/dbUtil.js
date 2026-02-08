import { MongoClient } from "mongodb";

let _db;

export async function mongoConnect() {
  if (_db) return _db;

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();

  _db = client.db("airbnb");
  console.log("MongoDB connected");

  return _db;
}

export function get_() {
  if (!_db) throw new Error("DB not connected");
  return _db;
}
