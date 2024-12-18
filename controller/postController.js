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
        const allHomeProjects = await posts.find().limit(6)
        res.status(200).json(allHomeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all user projects -auth user
exports.getUserProjectsController = async (req,res)=>{
    console.log("getUserProjectsController");
    try {
        userId = req.userId
        const allUserProjects = await posts.find({userId})
        res.status(200).json(allUserProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all projects -auth user
exports.getAllProjectsController = async (req,res)=>{
    console.log("getAllProjectsController");
    try {
        const allProjects = await posts.find()
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get single user project by ID
exports.getSingleProjectController = async (req, res) => {
    console.log("getSingleProjectController");
    try {
      const { id } = req.params;
      const result = await posts.findById(id);
      if (!result) {
        return res.status(404).json("Post not found");
      }
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal server error");
    }
}

  