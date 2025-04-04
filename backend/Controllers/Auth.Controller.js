import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;
    console.log("Signup attempt for username:", username);

    if (!fullname || !username || !password || !confirmpassword || !gender) {
      return res.status(400).json({ error: "Please fill all the details" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedpassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await generateTokenandSetCookie(newUser._id, res);
      await newUser.save();
      console.log("User created successfully:", newUser._id);
      
      return res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username);
    
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log("Login failed: User not found for username:", username);
      return res.status(400).json({ error: "Invalid username or password" });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
    
    if (!isPasswordCorrect) {
      console.log("Login failed: Incorrect password for username:", username);
      return res.status(400).json({ error: "Invalid username or password" });
    }
    
    await generateTokenandSetCookie(user._id, res);
    console.log("User logged in successfully:", user._id);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("Logout request received");
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });
    
    console.log("User logged out successfully");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
