const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`[DATABASE] Connected to MongoDB.`);
  } catch (error) {
    console.error(`[DATABASE] Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
