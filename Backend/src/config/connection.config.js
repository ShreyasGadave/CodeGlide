import mongoose from "mongoose";
import config from "./config.js";

const connectDB = () => {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log("Database Connected")) 
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

export default connectDB;
