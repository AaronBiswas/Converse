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
app.use(cors({
  origin: ["http://localhost:5173","https://converse-client-z44p.onrender.com"],
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);

server.listen(PORT, () => {
  connected();
  console.log(`Server is running at port ${PORT}`);
});
