const mongoose = require("mongoose")
const {v4} = require("uuid")

const userSchma = new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true

});

const User = mongoose.model("User",userSchma)

module.exports = User