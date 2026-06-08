import Resume from "/home/sanobery/interview-ai-pro/packages/shared/models/Resume.ts";

import { resumeQueue } from "../queues/resume.queue";

// export const uploadResume = async (req: any, res: any) => {
//   const resume = await Resume.create({
//     userId: req.userId,

//     filePath: req.file.path,
//   });

//   await resumeQueue.add("analyze", {
//     resumeId: resume._id,
//   });

//   res.json({
//     message: "Resume uploaded",
//     resume,
//   });
// };
export const uploadResume = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("================================");
    console.log("Upload Request for User:", userId);

    // 🔴 STEP 1: Count existing resumes
    const count = await Resume.countDocuments({ userId });

    // 🔴 STEP 2: Block if limit reached
    if (count >= 500) {
      return res.status(400).json({
        success: false,
        message: "Resume limit reached. You can upload only 5 resumes.",
      });
    }

    // 🔴 STEP 3: Continue upload logic
    const resume = await Resume.create({
      userId,
      filePath: req.file.path,
    });

    await resumeQueue.add("analyze", {
      resumeId: resume._id,
    });

    return res.status(201).json({
      success: true,
      resume,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getResume = async (req: any, res: any) => {
  console.log("sano");
  const resume = await Resume.findById(req.params.id);
  console.log("================================");
  console.log("Fetching Resume:", req.params.id);
  console.log("Resume Found:", !!resume);
  if (!resume) {
    return res.status(404).json({
      message: "Resume not found",
    });
  }
  console.log("Resume Status:", resume);
  res.json({
    status: resume.status, // processing | done
    result: resume, // ATS output stored by worker
  });
};
