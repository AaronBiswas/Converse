import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protectRoute = async (req, res, next) => {
    try {
        console.log("Checking authentication, cookies:", req.cookies);
        const token = req.cookies.jwt;
        
        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({error: "No token provided, please log in"});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token verified, decoded userId:", decoded.userId);
            
            const user = await User.findById(decoded.userId).select("-password");
            
            if (!user) {
                console.log("No user found with decoded userId:", decoded.userId);
                return res.status(401).json({error: "User not found, please login again"});
            }
            
            console.log("Authentication successful for user:", user._id);
            req.user = user;
            next();
            
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({error: "Your session has expired. Please login again."});
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({error: "Internal server error"});
    }
};

export default protectRoute;