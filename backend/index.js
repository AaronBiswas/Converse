import express from "express";
import { config } from "dotenv";
import authRoutes from "../backend/Routes/Auth.routes.js";
import connected from "./db/connectdb.js";

const app = express();
config();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.send("Hello");
});



app.use(express.json());
app.use("/api/auth/", authRoutes);

app.listen(PORT, () => {
  connected();
  console.log(`Server is running at port ${PORT}`);
});
