const jwt = require("jsonwebtoken")

const generateToken = async (_id, res) => {
    try {
        const token = await jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "12h" });

        res.cookie("token", token, {
            httpOnly: true,           
            maxAge: 12 * 60 * 60 * 1000,       
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: "strict",            
        });

        return token;
    } catch (error) {
        console.error("Error in generating token:", error);
    }
};

module.exports = generateToken;


const verifyToken = (token)=>{
    try {
        return jwt.verify(token,process.env.JWT_SECRET_KEY)
    } catch (error) {
        if (error.name==="TokenExpiredError") {
            console.error("Token expired");
            throw new Error("TokenExpired");
        }else{
            console.error("Error verifying token:", error);
            throw new Error("InvalidToken");
        }
    }
}

module.exports = {generateToken,verifyToken}