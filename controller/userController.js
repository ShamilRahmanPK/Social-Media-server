
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req,res)=>{
    console.log('registerController');
    const {firstname,lastname,username,email,password} = req.body
    console.log(firstname,lastname,username,email,password);

    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(406).json("User Already exist.. Please Login")

        } else {
            const newUser = new users({
                firstname,lastname,username,email,password,profilePic:"",userBio:"Feeling Good.."
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json('request recieved')
    }

    
}

// login

exports.loginController = async (req,res)=>{
    console.log("loginController");
    const {email,password} = req.body
    console.log(email,password);

    try {
        const existingUser = await users.findOne({email,password})
        if (existingUser) {
            // token generating
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        } else {
            res.status(404).json("Invalid Email or Password")
        }
    } catch (err) {
        res.status(401).json('request recieved')
    }

}

// profile updation


// viewHomeProfile

exports.getHomeUserProfile = async (req,res) => {
    console.log("getHomeUserProfile");
    try {
        const allHomeUserProfile = await users.find().limit(6)
        res.status(200).json(allHomeUserProfile)
    } catch (err) {
        res.status(401).json(err)
    }
}
