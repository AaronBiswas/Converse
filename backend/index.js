import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "../backend/Routes/Auth.routes.js";
import messageRoutes from "../backend/Routes/Message.routes.js";
import userRoutes from "../backend/Routes/User.routes.js";
import connected from "./db/connectdb.js";

const app = express();
config();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.send("Hello");
});



app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT, () => {
  connected();
  console.log(`Server is running at port ${PORT}`);
});
