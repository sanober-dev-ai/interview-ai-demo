import { Router } from "express";

import { uploadResume, getResume } from "../controllers/resume.controller";

import { upload } from "../config/multer";

const router = Router();

router.post("/upload", upload.single("resume"), uploadResume);
router.get("/:id", getResume);

export default router;
