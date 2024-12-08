const { verifyToken } = require("../utils/token.utils");

const userAuth = async(req,res,next)=>{
    try {
        const token = req.cookies?.token
        if(!token) {
            return res.status(401).json({message:"please login again"});
        }
        const verify = await verifyToken(token);
        req.user = verify
        next()
    } catch (error) {
        if (error.name === "TokenExpired") {
            return res.status(401).json({ message: "Token has expired, please login again" });
        }
        res.status(500).json({message:"Authentication failed"})
        console.log("Error in userAuth middleware:",error.message);
    }
};

module.exports = {userAuth}