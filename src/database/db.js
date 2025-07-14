require("dotenv").config();
const mongoose = require("mongoose");
exports.databaseConnection = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("database Error");
  }
};
