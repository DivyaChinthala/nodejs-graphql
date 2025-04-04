import { MongoClient } from "mongodb";

let db = null; // Singleton DB instance

async function connectDB() {
  if (db) return db; // Return existing DB instance if already connected

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db(process.env.MONGODB_DB_MAIN);
    console.log("✅ Connected to MongoDB");

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
