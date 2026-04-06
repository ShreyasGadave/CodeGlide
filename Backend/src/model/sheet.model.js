import mongoose from "mongoose";

const SheetSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      ref: "User",
    },

    link: { type: String},
    session: { type: String },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: { type: String },

    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },

    followers: { type: Number, default: 0 },
    tag: { type: [String], default: [] },
    banner: { type: String },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    isFeaturedOnExplore: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    forkedCount: { type: Number, default: 0 },

    // ⚡ IMPORTANT — UI state only, not DB logic
    isFollowing: { type: Boolean, default: false },

    config: {
      topicOrder: { type: [String], default: [] },

      subTopicOrder: {
        type: Map,
        of: [String],
        default: {},
      },

      // refs to SheetMapping NOT Question
      questionOrder: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SheetMapping",
        },
      ],
    },

    authorDetails: {
      // 🔥 FIXED (your error earlier)
      id: { type: mongoose.Schema.Types.Mixed },

      profileName: String,
      firstName: String,
      secondName: String,
      imageUrl: String,
      isAnonymous: { type: Boolean, default: false },

      college: String,
      country: String,
      email: String,

      collegeDetails: {
        id: { type: mongoose.Schema.Types.Mixed, default: null },
        collegeName: { type: String, default: "" },
      },
    },
  },
  { timestamps: true }
);

// INDEXES
SheetSchema.index({ author: 1 });
SheetSchema.index({ tag: 1 });
SheetSchema.index({ isFeaturedOnExplore: 1 });
SheetSchema.index({ visibility: 1 });
SheetSchema.index({ followers: -1 });

export default mongoose.model("Sheet", SheetSchema);