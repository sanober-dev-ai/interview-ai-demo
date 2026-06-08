import { Request, Response } from "express";

import User from "/home/sanobery/interview-ai-pro/packages/shared/models/User.ts";
import Resume from "/home/sanobery/interview-ai-pro/packages/shared/models/Resume.ts";
import bcrypt from "bcryptjs";

import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString());

  return res.status(201).json({
    token,
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = generateToken(user._id.toString());

  return res.json({
    token,
    user,
  });
};

export const getUserResumes = async (req, res) => {
  const { userId } = req.params;

  const resumes = await Resume.find()
    .sort({ createdAt: -1 })
    .select("atsScore status createdAt filePath");

  return res.json(resumes);
};
