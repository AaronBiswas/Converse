import jwt from "jsonwebtoken";

const generateTokenandSetCookie = async (userId, res) => {
  try {
    const Token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    console.log("Generating token for userId:", userId);
    
    // Create cookie options based on environment
    const cookieOptions = {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true,
      sameSite: "none", // Use "none" to allow cross-site cookies
      secure: true, // Required when sameSite is "none"
      path: "/"
    };

    console.log("Setting cookie with options:", JSON.stringify(cookieOptions));
    res.cookie("jwt", Token, cookieOptions);
    return Token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate authentication token");
  }
};

export default generateTokenandSetCookie;