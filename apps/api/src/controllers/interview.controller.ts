import Resume from "@shared/models/Resume";
import Interview from "@shared/models/Interview";
import { generateQuestions } from "../utils/questionGenerator";

export const createInterview = async (req, res) => {
  const { resumeId } = req.body;

  const resume = await Resume.findById(resumeId);

  if (!resume) {
    return res.status(404).json({
      message: "Resume not found",
    });
  }

  const questions = generateQuestions(resume.profile?.skills || []);

  const interview = await Interview.create({
    userId: req.user.id,
    resumeId,
    questions,
  });

  res.status(201).json(interview);
};

export const getInterview = async (req, res) => {
  const interview = await Interview.findById(req.params.id);

  if (!interview) {
    return res.status(404).json({
      message: "Interview not found",
    });
  }

  res.json(interview);
};

export const submitAnswers = async (req, res) => {
  const { answers } = req.body;

  const interview = await Interview.findById(req.params.id);

  if (!interview) {
    return res.status(404).json({
      message: "Interview not found",
    });
  }

  interview.answers = answers;

  interview.status = "COMPLETED";

  await interview.save();

  res.json(interview);
};
