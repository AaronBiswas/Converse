import express from "express";
import { sendMessage } from "../Controllers/Message.Controller.js";
import protectRoute from "../Middleware/protectRoute.js";

const router=express.Router();


router.post("/send/:id",protectRoute,sendMessage);

export default router;