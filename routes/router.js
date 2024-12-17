const express = require('express')
const userController = require('../controller/userController')
const postController = require('../controller/postController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')

const router = new express.Router()


// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add post
router.post('/add-post',jwtMiddleware,multerMiddleware.single("imageUrl"),postController.addPostController)


module.exports = router