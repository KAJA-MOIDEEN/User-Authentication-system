const express = require("express")
const { register, login, logout, resetPassword, forGotPassword, changePassword } = require("../controllers/auth.controller")
const { userAuth } = require("../middleware/user.auth.protect")

const router = express.Router()


router
.post("/register",register)
.post("/login",login)
.get("/logout",logout)
.put("/change-password",userAuth,changePassword)
.post("/forgot-password/",forGotPassword)
.post("/reset-password/:id/:_id",resetPassword)

module.exports = router