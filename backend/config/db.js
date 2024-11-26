import mongoose from "mongoose";
import envVars from "./envVars.js";

const MONGO_URL = envVars.MONGO_URL;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
