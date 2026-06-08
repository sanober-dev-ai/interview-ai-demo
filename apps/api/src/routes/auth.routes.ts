import { Router } from "express";

import {
  register,
  login,
  getUserResumes,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/:userId", getUserResumes);

export default router;
