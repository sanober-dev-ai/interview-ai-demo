import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";
import { connectDB } from "./config/db";
import { resumeQueue } from "./queues/resume.queue";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
// app.get("/job", async (_, res) => {
//   const job = await resumeQueue.add("test-job", {
//     message: "Hello BullMQ",
//     timestamp: new Date().toISOString(),
//   });

//   res.json({
//     success: true,
//     jobId: job.id,
//   });
// });

app.get("/job", async (_, res) => {
  const job = await resumeQueue.add(
    "delayed-job",
    {
      message: "Run after 100 seconds",
    },
    {
      delay: 100000, // 10 seconds
    },
  );

  res.json({
    success: true,
    jobId: job.id,
  });
});

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

connectDB();

app.listen(5000, () => {
  console.log("API running");
});
