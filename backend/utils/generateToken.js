import jwt from "jsonwebtoken";

const generateTokenandSetCookie = async (userId,res) => {
    const Token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    });

    res.cookie("jwt",Token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"none",
    })
}

export default generateTokenandSetCookie;