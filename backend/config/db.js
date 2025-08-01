require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Mongoose Connected Successfully !");
  } catch (err) {
    console.log("Error whhile connecting mongoose", err);
  }
};

module.exports = connectDB;
