const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/token.utils")
const { setToken } = require("../middleware/user.auth.protect")

const register = async(req,res)=>{
    try {
        const {userName,password,email} = req.body
        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email Already Exist"})
        }
        if (password.length <= 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
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
            await setToken(token,res)
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

const logout = (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"Logout Successfull"
    })
}

const resetPassword = (req,res)=>{
    const {currentPassword,password,confirmPassword} = req.body
    const user = req.user
}

module.exports = {register,login,logout,resetPassword}