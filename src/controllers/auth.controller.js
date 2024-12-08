const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const {generateToken, verifyToken} = require("../utils/token.utils")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    try {
        const {userName,password,confirmPassword,email} = req.body
        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email Already Exist"})
        }
        if (password.length <= 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"Password do not match"})
        }
        const hashpassword = await bcrypt.hash(password,10)
        
        const user = new User({
            userName,
            email,
            password:hashpassword,
        })

        await user.save()
       
        const token = await generateToken(user._id,res)

        const userDetails = {
            name:user.userName,
            email:user.email,
        }
        res.status(201).json({
            message:"User Created Successfully",
            userDetails
        })
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",
            error:error.message})
            console.log(error.message);
    }
}
const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({message:"Invalid Email or Password"})
        }
        const validePassword = await bcrypt.compare(password,user.password);
        if(!validePassword){
            return res.status(400).json({message:"Invalid Email or Password"})
            }
            const token = await generateToken(user._id,res)

            const userDetails = {
                name:user.userName,
                email:user.email,
            }
        res.status(200).json({
            message:"Login Successfull",
            userDetails
        })
    }catch(error){
        res.status(500).json({message:"Internal Server Error",
            error:error.message,
        })
    }
}

const logout = (req, res) => {
    try {
      // Clear the token cookie
      res.cookie("token", "", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "development", 
        sameSite: "strict", 
        maxAge: 0 
      });
  
      // Send success response
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Error in logout", error: error.message });
    }
  };
  

const changePassword = async(req,res)=>{
    try {
        const {currentPassword,newPassword,confirmPassword} = req.body
        const {_id} = req.user
        const user = await User.findById(_id);
        if(!user){
            return res.status(400).json({message:"Invalid User"})
            }
        if (newPassword.length <= 8) {
           return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        
        const isValidePassword = await bcrypt.compare(currentPassword,user.password)
        if (!isValidePassword) {
            return res.status(400).json({ message: "Invalid Current Password" });
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({message:"Password do not match"})
        }
        const hashpassword = await bcrypt.hash(newPassword,10)
        const updateUser = await User.findByIdAndUpdate(_id,{password:hashpassword},{new:true}).select("-password").select("-_id").select("__v")
        
        res.status(200).json({
            updateUser
        })    
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        console.log("error in resetpassword",error.message);
        
    }
    
}
const forGotPassword = async(req,res)=>{
try {
   const {email} = req.body 
   const user = await User.findOne({email})
   if(!user){
    return res.status(400).json({message:"Invalid Email"})
    }
    const token = jwt.sign({user},process.env.JWT_SECRET_KEY,{expiresIn: "2m"})
        res.status(200).json({
            token,
            _id:user._id
        })
        } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        console.log("error in forgotpassword",error.message);
        }
}

const resetPassword = async(req,res)=>{
    try {
        const {currentPassword,newPassword,confirmPassword} = req.body
        const {id,_id} = req.params
        await verifyToken(id)
        
        const user = await User.findById(_id);

        if(!user){
            return res.status(400).json({message:"Invalid User"})
            }
        if (newPassword.length <= 8) {
           return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        
        const isValidePassword = await bcrypt.compare(currentPassword,user.password)
        if (!isValidePassword) {
            return res.status(400).json({ message: "Invalid Current Password" });
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({message:"Password do not match"})
        }
        const hashpassword = await bcrypt.hash(newPassword,10)
        const updateUser = await User.findByIdAndUpdate(_id,{password:hashpassword},{new:true}).select("-password").select("-_id").select("__v")
        
        res.status(200).json({
            updateUser
        })    
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        console.log("error in resetpassword",error.message);
        
    }
    
}

module.exports = {register,login,logout,resetPassword,forGotPassword,changePassword}