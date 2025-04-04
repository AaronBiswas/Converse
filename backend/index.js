import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";
import job from "./utils/cronjob.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

job.start();

// Middleware
// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  undefined, // For mobile apps or requests without Origin header
  "https://converse-chat.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request origin:", origin);
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        console.log("Blocked by CORS:", origin);
        return callback(new Error("CORS policy violation"), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json()); // parse json request body
app.use(cookieParser()); // parse cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Static files
const dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err.message}`);
  });
