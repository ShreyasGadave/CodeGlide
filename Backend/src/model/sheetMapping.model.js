import mongoose from "mongoose";

const SheetMappingSchema = new mongoose.Schema(
  {
    sheetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sheet",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    topic: { type: String, required: true },
    subTopic: { type: String },

    title: { type: String }, // display title
    resource: { type: String },

    session: { type: String },

    isPublic: { type: Boolean, default: true },

    hotness: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },

    popularSheets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sheet" }],
  },
  { timestamps: true }
);

// 🚀 CRITICAL INDEX
SheetMappingSchema.index({ sheetId: 1, topic: 1, subTopic: 1 });
SheetMappingSchema.index({ sheetId: 1, rank: 1 });

export default mongoose.model("SheetMapping", SheetMappingSchema);