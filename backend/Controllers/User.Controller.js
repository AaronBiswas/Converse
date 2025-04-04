import User from "../models/User.model.js"

export const getUsersforSidebar = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            console.log("No authenticated user found in request");
            return res.status(401).json({ error: "User not authenticated" });
        }

        const loggedInUserId = req.user._id;
        console.log(`Fetching users for sidebar for user: ${loggedInUserId}`);
        
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        
        console.log(`Found ${filteredUsers.length} users to display`);
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersforSidebar:", error);
        return res.status(500).json({ error: "Failed to fetch users" });
    }
}