const express = require("express")
const { register, login, logout, resetPassword } = require("../controllers/auth.controller")
const { userAuth } = require("../middleware/user.auth.protect")

const router = express.Router()


router
.post("/register",register)
.post("/login",login)
.get("/logout",logout)
.put("resetPassword",userAuth,resetPassword)

module.exports = router