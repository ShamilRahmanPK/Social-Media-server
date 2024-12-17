const posts = require('../models/postModel')

// add post
exports.addPostController = async (req,res) => {
    console.log("addPostController");
    const userId = req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log(req.file)
    const {postname,description} = req.body
    const imageUrl = req.file.filename

    try {
        const existingPost = await posts.findOne({description})
        if (existingPost) {
            res.status(406).json("Post already exisit")
        }else{
            const newPost = new posts({
                postname,description,imageUrl,userId
            })
            await newPost.save()
            res.status(200).json(newPost)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// get home project
exports.getHomeProjectsController = async (req,res)=>{
    console.log("getHomeProjectsController");
    try {
        const allHomeProjects = await posts.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all user projects -auth user
exports.getHomeProjectsController = async (req,res)=>{
    console.log("getHomeProjectsController");
    try {
        const allHomeProjects = await posts.find()
        res.status(200).json(allHomeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}