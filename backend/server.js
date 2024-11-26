import express from "express";
import envVars from "./config/envVars.js";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./config/db.js";
const app = express();
app.use(express.json());

app.use("/api/auth/", authRoutes);
const PORT = envVars.PORT;

connectDB();
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
