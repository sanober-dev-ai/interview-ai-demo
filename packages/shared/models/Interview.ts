import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },

    questions: [String],

    answers: [String],

    feedback: [String],

    score: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Interview", InterviewSchema);
