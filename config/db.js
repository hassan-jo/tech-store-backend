const mongoose = require("mongoose");

let retryCount = 0;
const MAX_RETRIES = 5;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
    retryCount = 0;
  } catch (error) {
    console.error("MongoDB connection error");

    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Retrying connection (${retryCount})...`);

      setTimeout(() => connectDB(), 5000);
    } else {
      console.error("Database connection failed permanently");
      process.exit(1);
    }
  }
};

module.exports = connectDB;