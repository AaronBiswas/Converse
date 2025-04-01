import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protectRoute = async (req,res,next) => {
    try {
        const token=req.cookies.jwt;

        if(!token){
            return res.status(400).json({message:"User not authorised!"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(400).json({message:"User token not authorised!"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        req.user=user;

        next();

    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
    }
}


export default protectRoute;