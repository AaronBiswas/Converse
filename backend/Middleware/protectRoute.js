import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            console.log("No JWT token found in cookies");
            return res.status(401).json({error: "Not authorized, no token provided"});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if (!decoded || !decoded.userId) {
                console.log("Token verification failed or missing userId");
                return res.status(401).json({error: "Token is invalid or expired"});
            }
            
            const user = await User.findById(decoded.userId).select("-password");
            
            if (!user) {
                console.log(`User with ID ${decoded.userId} not found`);
                return res.status(404).json({error: "User not found"});
            }
            
            req.user = user;
            next();
            
        } catch (verifyError) {
            console.log("JWT verification error:", verifyError.message);
            return res.status(401).json({error: "Token is invalid or expired"});
        }
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({error: "Internal server error"});
    }
};

export default protectRoute;