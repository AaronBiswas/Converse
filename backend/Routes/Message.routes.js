import express from "express";
import { getMessage, sendMessage } from "../Controllers/Message.Controller.js";
import protectRoute from "../Middleware/protectRoute.js";

const router=express.Router();

router.get("/:id",protectRoute,getMessage);
router.post("/send/:id",protectRoute,sendMessage);

export default router;