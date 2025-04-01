import User from "../models/User.model.js"

export const getUsersforSidebar= async (req,res) => {
    try {
        const loggedInuserId= req.user._id;
        const filteredUsers= await User.find({_id:{$ne:loggedInuserId}}).select("-password");
    return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
    }
}