import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mappingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SheetMapping",
      required: true,
    },

    sheetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sheet",
      required: true,
    },

    isSolved: {
      type: Boolean,
      default: false,
    },

    questionDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    solvedAt: Date,
  },
  { timestamps: true }
);

UserProgressSchema.index({ userId: 1, sheetId: 1 });

export default mongoose.model("UserProgress", UserProgressSchema);