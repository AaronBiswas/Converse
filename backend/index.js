import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { default as authRoutes } from "./Routes/Auth.routes.js";
import { default as messageRoutes } from "./Routes/Message.routes.js";
import { default as userRoutes } from "./Routes/User.routes.js";
import cors from "cors";
import { app, server } from "./Socket/Socket.js";
import path from "path";
import { fileURLToPath } from "url";
import job from "./utils/cronjob.js";
import fs from "fs";

// Configure dotenv with explicit path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// For debugging
console.log("Environment variables loaded:");
// Don't log sensitive information
console.log("PORT:", process.env.PORT);

// Ensure port is set to 8000 for Render
const PORT = process.env.PORT || 8000;

job.start();

// Middleware
// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  undefined, // For mobile apps or requests without Origin header
  "https://converse-chat.onrender.com",
  "https://converse-client-z44p.onrender.com",
  "https://converse-7i2n.onrender.com"
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
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// Add a test route at the API root
app.get("/api/test", (req, res) => {
  console.log("API root test route hit");
  return res.status(200).json({ 
    message: "API is working", 
    routes: [
      "/api/auth/*",
      "/api/message/*",
      "/api/users/*"
    ]
  });
});

// Debug route registration
console.log("Registered routes:");
console.log("- Auth routes: /api/auth/*");
console.log("- Message routes: /api/message/*");
console.log("- User routes: /api/users/*");

// Static files
const dirname = path.resolve();
const frontendDistPath = path.join(dirname, "frontend", "dist");

if (process.env.NODE_ENV === "production" && fs.existsSync(frontendDistPath)) {
  console.log("Serving static files from:", frontendDistPath);
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err.message}`);
  });
