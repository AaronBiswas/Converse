import express from "express";
import protectRoute from "../Middleware/protectRoute.js";
import { getUsersforSidebar } from "../Controllers/User.Controller.js";

const router = express.Router();

router.get("/",protectRoute,getUsersforSidebar);

export default router;