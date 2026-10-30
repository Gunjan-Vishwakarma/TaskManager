const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error(
        "Error: MONGO_URI is not defined. Please ensure your backend/.env file exists and contains MONGO_URI."
      );
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Mongoose Connected Successfully !");
  } catch (err) {
    console.log("Error whhile connecting mongoose", err);
  }
};

module.exports = connectDB;
