import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

import { connectDB } from "./config/db";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

connectDB();

app.listen(5000, () => {
  console.log("API running");
});
