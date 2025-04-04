import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../backend/Routes/Auth.routes.js";
import messageRoutes from "../backend/Routes/Message.routes.js";
import userRoutes from "../backend/Routes/User.routes.js";
import connected from "./db/connectdb.js";
import { app, server } from "./Socket/Socket.js";
import job from "./utils/cronjob.js";

config();
const PORT = process.env.PORT || 8000;

job.start();

app.get("/", (req, res) => {
  return res.send("Hello");
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://converse-client-z44p.onrender.com',
  // Add mobile app domain if different
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.onrender.com')) {
      callback(null, true);
    } else {
      console.log('CORS blocked request from:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connected();
  console.log(`Server is running at port ${PORT}`);
});
