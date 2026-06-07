import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    filePath: String,

    atsScore: Number,

    strengths: [String],

    weaknesses: [String],

    suggestions: [String],

    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "DONE", "FAILED"],
      default: "PENDING",
    },
    profile: {
      name: String,
      email: String,
      phone: String,

      skills: [String],

      education: [
        {
          degree: String,
          college: String,
          year: String,
        },
      ],

      experience: [
        {
          company: String,
          role: String,
          duration: String,
        },
      ],

      projects: [
        {
          name: String,
          description: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", ResumeSchema);
