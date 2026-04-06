import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    mobile: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dateOfBirth: {
      type: Date,
    },

    profilePic: {
      public_id: {
        type: String,
        default: "amvfmhjviqpbmvu4txsf",
      },
      url: {
        type: String,
        default:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s",
      },
    },

    college: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    year: {
      type: Number,
      min: 1,
      max: 5,
    },

    rollNumber: {
      type: String,
      default: "",
    },

    address: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    platforms: {
      github: { type: String, default: "" },
      leetcode: { type: String, default: "" },
      geeksforgeeks: { type: String, default: "" },
      codeforces: { type: String, default: "" },
    },

    career: {
      lookingFor: {
        type: String,
        enum: ["Internship", "Job", ""],
        default: "",
      },
      preferredRole: {
        type: String,
        default: "",
      },
      resume: {
        public_id: { type: String, default: "" },
        url: { type: String, default: "" },
      },
    },

    sheets: [
      {
        sheet_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sheet",
        },
        solved_questions: [
          {
            question_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Question",
            },
          },
        ],
      },
    ],

    emailVerification: {
      otp: {
        type: String,
        select: false, // security
      },
      expiresAt: {
        type: Date,
      },
      attempts: {
        type: Number,
        default: 0,
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    terms: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", UserSchema);
