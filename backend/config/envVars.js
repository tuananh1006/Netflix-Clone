import dotenv from "dotenv";

dotenv.config();

const envVars = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};

export default envVars;
