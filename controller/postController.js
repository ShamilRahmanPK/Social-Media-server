const posts = require('../models/postModel')
const fs = require("fs");
const fetch = require('node-fetch');
const path = require('path')
require("dotenv").config();

// add post
exports.addPostController = async (req,res) => {
    console.log("addPostController");
    const userId = req.userId
    // console.log(userId)
    // console.log(req.body)
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
exports.getHomeProjectsController = async (req, res) => {
    console.log("getHomeProjectsController");

    try {
        const allHomeProjects = await posts.find().sort({ _id: -1 }).limit(6);
        res.status(200).json(allHomeProjects);
    } catch (err) {
        res.status(401).json(err);
    }
};



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

// get another user posts
exports.getAnotherUserPosts = async (req,res) => {
    console.log("getAnotherUserPosts");
    try {
        const {userId} = req.params
        const result = await posts.find({userId})
        if (result) {
            res.status(200).json(result)
        }else{
            res.status(404).json("No Posts")
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("error while fetching")
    }
}

// edit post 
exports.editPostController = async (req, res) => {
    console.log("Inside editPostController");
    const { id } = req.params;
    // console.log("Post ID:", id);
    const { postname, description, imageUrl, userId } = req.body;
  
    try {
      const updatedPost = await posts.findByIdAndUpdate(
        id,
        { postname, description, imageUrl, userId },
        { new: true}
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(updatedPost); 
    } catch (err) {
      console.error("Error updating post:", err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  };

//   delete post
exports.deletePostController = async (req,res) => {
    console.log("deletePostController");
    const { id } = req.params;
    try {
        const removedPost = await posts.findByIdAndDelete({_id:id})
        res.status(200).json(removedPost)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get post text 
exports.generateDescription = async (req, res) => {
    try {
        console.log("Uploaded file path:", req.file.path);
        console.log("Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No image provided" });
        }

        const absoluteFilePath = path.resolve(req.file.path);

        // Hugging Face API
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                },
                body: fs.createReadStream(absoluteFilePath),
            }
        );

        const data = await response.json();
        if (response.ok && Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            const caption = data[0].generated_text;
            return res.status(200).json({
                title: caption,
                description: `This image likely represents: ${caption}`,
            });
        } else {
            return res.status(500).json({
                message: "Failed to generate description",
                data,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};