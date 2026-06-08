import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./config/db";

connectDB();

import "./workers/resume.worker";

console.log("Resume worker started");
