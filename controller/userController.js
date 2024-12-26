
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

// exports.loginController = async (req,res)=>{
//     console.log("loginController");
//     const {email,password} = req.body
//     console.log(email,password);

//     try {
//         const existingUser = await users.findOne({email,password})
//         if (existingUser) {
//             // token generating
//             const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
//             res.status(200).json({user:existingUser,token})
//         } else {
//             res.status(404).json("Invalid Email or Password")
//         }
//     } catch (err) {
//         res.status(401).json('request recieved')
//     }
// }
exports.loginController = async (req, res) => {
  console.log('loginController');
  const { email, password } = req.body;

  try {
    // Find the user by email and password
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD);
      // Check if the userId is already saved in the userdocument
      if (!existingUser.userId) {
        // Save the userId in the user document
        existingUser.userId = existingUser._id.toString();
        await existingUser.save();
      }
      // Send the response with user and token
      res.status(200).json({ user: existingUser, token });
    } else {
      res.status(404).json('Invalid Email or Password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal server error');
  }
};


// profile updation
exports.editUserController = async (req,res)=>{
    console.log("inside editUserController");
    // get id of user from jwt middleware
    const id = req.userId
    // muter will active
    // get all text 
    const {firstname,lastname,username,email,password,profilePic,userBio,userId} = req.body
    const uploadedProfileImageFile = req.file?req.file.filename:profilePic
    // update user
    try {
        const updateUser = await users.findByIdAndUpdate({_id:id},{
            firstname,
            lastname,
            username,
            email,
            password,
            profilePic:uploadedProfileImageFile,
            userBio,
            userId
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(401).json(err)
    }
}

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


// get single user project by ID
exports.getSingleUserController = async (req, res) => {
    console.log("getSingleUserController");
    // const userId = req.userId
    try {
      const { userId } = req.params
      const result = await users.findById(userId);
      if (!result) {
        return res.status(404).json("User not found");
      }
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal server error")
    }
}

// get all users
exports.getAllUserController = async (req,res) => {
  console.log("inside getAllUserController");
    try {
        const allUser = await users.find()
        res.status(200).json(allUser)
    } catch (err) {
        res.status(401).json(err)
    }
}