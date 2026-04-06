import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not defined");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not defined");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not defined");
}

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  ACCESS_TOKEN_SECRET_CODE: process.env.ACCESS_TOKEN_SECRET_CODE,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  FLASK_URL: process.env.FLASK_URL,

  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_PROJECT_ID: process.env.GOOGLE_OAUTH_PROJECT_ID,
  GOOGLE_OAUTH_AUTH_URI: process.env.GOOGLE_OAUTH_AUTH_URI,
  GOOGLE_OAUTH_TOKEN_URI: process.env.GOOGLE_OAUTH_TOKEN_URI,
  GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,

  EMAIL: process.env.EMAIL,
  PASS: process.env.PASS,
  GOOGLE_OAUTH_REFRESH_TOKEN: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,

  PORT: process.env.PORT || 3001,
};

export default config;