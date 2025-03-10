const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    isValidate:{
        type:Boolean,
        required:true,
        default:false
    }
})

const posts = mongoose.model("posts",postSchema)

module.exports = posts