import express from "express";
import { getMessage, sendMessage } from "../Controllers/Message.Controller.js";
import protectRoute from "../Middleware/protectRoute.js";

const router = express.Router();

console.log("Registering message routes:");
console.log("- GET /:id for getMessage");
console.log("- POST /send/:id for sendMessage");

// Add the test route first (order matters in Express)
router.get("/test", (req, res) => {
  console.log("Message test route hit");
  return res.status(200).json({ message: "Message routes are working" });
});

// Add a test route with ID parameter that doesn't require authentication
router.get("/test/:id", (req, res) => {
  console.log("Message test ID route hit with ID:", req.params.id);
  return res.status(200).json({ 
    message: "Message ID route is working", 
    requestedId: req.params.id 
  });
});

// Debug route to verify auth in message routes
router.get("/debug/auth", protectRoute, (req, res) => {
  console.log("Auth debug route hit, user:", req.user?._id);
  return res.status(200).json({ 
    message: "Authentication successful",
    userId: req.user?._id
  });
});

// Debug route to check conversation parameter handling
router.get("/debug/:id", protectRoute, (req, res) => {
  console.log("Debug route hit with ID:", req.params.id, "User:", req.user?._id);
  return res.status(200).json({ 
    message: "Debug endpoint working", 
    userId: req.user?._id,
    conversationId: req.params.id 
  });
});

// Original routes
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;