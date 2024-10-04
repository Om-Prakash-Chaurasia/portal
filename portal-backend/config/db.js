const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase connection established successfully");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;
