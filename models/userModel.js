const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname : {
        type:String,
        require:true
    },
    lastname : {
        type:String,
        require:true
    },
    username : {
        type:String,
        require:true
    },
    email : {
        type:String,
        require:true,
        unique:true
    },
    password : {
        type:String,
        require:true
    },
    profilePic:{
        type:String,
    },
    userBio:{
        type:String,
    }
})

const users = mongoose.model("users",userSchema)
module.exports = users
