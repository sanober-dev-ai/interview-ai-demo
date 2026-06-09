import { Worker } from "bullmq";
import fs from "fs";
import pdfParse from "pdf-parse";

import { connection } from "../config/redis";
import Resume from "/home/sanobery/interview-ai-pro/packages/shared/models/Resume.ts";
import { ai } from "../services/gemini";

new Worker(
  "resume-analysis",
  async (job) => {
    console.log("================================");
    console.log("Processing Resume:", job.data.resumeId);

    const resume = await Resume.findById(job.data.resumeId);

    if (!resume) {
      throw new Error("Resume not found");
    }

    if (!resume.filePath) {
      throw new Error("Resume file path missing");
    }

    try {
      console.log("Reading PDF...");

      const pdfBuffer = fs.readFileSync(
        "/home/sanobery/interview-ai-pro/apps/api/" + resume.filePath,
      );

      const parsed = await pdfParse(pdfBuffer);

      console.log("PDF Parsed Successfully");
      console.log("Calling Gemini...");

      const prompt = `
You are an ATS Resume Analyzer and Resume Parser.

Analyze the following business development manager.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "profile": {
    "name": "",
    "email": "",
    "phone": "",
    "skills": [],
    "education": [
      {
        "degree": "",
        "college": "",
        "year": ""
      }
    ],
    "experience": [
      {
        "company": "",
        "role": "",
        "duration": ""
      }
    ],
    "projects": [
      {
        "name": "",
        "description": ""
      }
    ]
  }
}

Rules:
- Return ONLY JSON.
- Do not wrap JSON in markdown.
- ATS score must be between 0 and 100.
- Extract as much information as possible.
- Use empty strings or empty arrays when information is unavailable.

Resume:

${parsed.text}
`;

      // const response = await ai.models.generateContent({
      //   model: "models/gemini-2.5-flash",
      //   contents: prompt,
      // });

      // const text = response.text;

      // if (!text) {
      //   throw new Error("Empty Gemini response");
      // }

      // const analysis = JSON.parse(
      //   text
      //     .replace(/```json/g, "")
      //     .replace(/```/g, "")
      //     .trim(),
      // );

      // console.log(analysis);
      const analysis = {
        atsScore: 82,
        strengths: ["React", "Node.js", "TypeScript"],
        weaknesses: ["Testing", "CI/CD"],
        suggestions: [
          "Add testing projects",
          "Include measurable achievements",
        ],
        profile: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+91xxxxxxxxxx",
          skills: ["React", "Node.js", "MongoDB", "TypeScript"],
          education: [
            {
              degree: "B.Tech Computer Science",
              college: "XYZ University",
              year: "2023",
            },
          ],
          experience: [],
          projects: [],
        },
      };

      resume.atsScore = analysis.atsScore ?? 0;
      resume.strengths = analysis.strengths ?? [];
      resume.weaknesses = analysis.weaknesses ?? [];
      resume.suggestions = analysis.suggestions ?? [];

      resume.profile = {
        name: analysis.profile?.name ?? "",
        email: analysis.profile?.email ?? "",
        phone: analysis.profile?.phone ?? "",

        skills: analysis.profile?.skills ?? [],

        education: analysis.profile?.education ?? [],

        experience: analysis.profile?.experience ?? [],

        projects: analysis.profile?.projects ?? [],
      };

      resume.status = "DONE";

      await resume.save();

      console.log("Resume Analysis Saved");
      console.log("ATS Score:", analysis);
      console.log("================================");
    } catch (error) {
      console.error("Resume Analysis Failed");
      console.error(error);

      resume.status = "FAILED";

      await resume.save();
    }
  },
  {
    connection: connection as any,
  },
);
