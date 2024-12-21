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

// home posts - get
router.get('/home-posts',postController.getHomeProjectsController)

// user posts - get
router.get('/user-posts',jwtMiddleware,postController.getUserProjectsController)

// all posts - get
router.get('/all-posts',jwtMiddleware,postController.getAllProjectsController)

// Fetch single post by ID
router.get('/post/:id', jwtMiddleware, postController.getSingleProjectController);

// Home users
router.get('/home-users',userController.getHomeUserProfile);

// Fetch single user by userId
router.get('/user/:userId', jwtMiddleware, userController.getSingleUserController);

// fetch another user posts by userId
router.get('/user/posts/:userId', jwtMiddleware, postController.getAnotherUserPosts);

// edit profie
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController);

// edit post
router.put('/post/:id/edit', jwtMiddleware,multerMiddleware.single("imageUrl") ,postController.editPostController);

// delete post 
router.delete('/post/:id/delete', jwtMiddleware,postController.deletePostController);

module.exports = router