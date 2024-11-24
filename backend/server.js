import express from "express";
import authRoutes from "./routes/auth.route.js";
const app = express();

app.use("/api/v1/auth", authRoutes);

app.listen(500, () => {
  console.log("Server started at port 500");
});
