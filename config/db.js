const mongoose = require("mongoose");

console.log("db.js file loaded"); 

const connectDB = async () => {
  try {
    console.log("Trying to connect MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
