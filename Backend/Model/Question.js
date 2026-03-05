import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Basic", "Easy", "Medium", "Hard"],
    },

    problemUrl: {
      type: String,
      required: true,
    },

    topics: [{ type: String }],

    verified: {
      type: Boolean,
      default: false,
    },

    similarQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

// 🔥 Unique per platform
QuestionSchema.index({ platform: 1, slug: 1 }, { unique: true });

export default mongoose.model("Question", QuestionSchema);