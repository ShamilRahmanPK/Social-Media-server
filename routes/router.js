const express = require('express')
const userController = require('../controller/userController')
const postController = require('../controller/postController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const multer = require("multer");

const router = new express.Router()


// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add post
router.post('/add-post',jwtMiddleware,multerMiddleware.single("imageUrl"),postController.addPostController)

// home posts - get
router.get('/home-posts',postController.getHomePostController)

// user posts - get
router.get('/user-posts',jwtMiddleware,postController.getUserPostController)

// all posts - get
router.get('/all-posts',jwtMiddleware,postController.getAllPostController)

// Fetch single post by ID
router.get('/post/:id', jwtMiddleware, postController.getSinglePostController);

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

// all users - get
router.get('/all-user',jwtMiddleware,userController.getAllUserController)

// text generate

// Route for generating description
router.post("/generate-description",multerMiddleware.single("image"),postController.generateDescription);

// admin 

// get all post for approval
router.get('/admin/all-post-approval',postController.getAllPostApprovalController)

// Fetch single user by userId
router.get('/admin-post-view/:id',postController.getAdminSinglePostController);

// approve post by id
// Approve a post
router.patch('/approve-post/:id', postController.approvePostController);

// delete post 
router.delete('/admin/:id/delete',postController.adminDeletePostController);

// get all post for admin
router.get('/admin/all-post',postController.adminGetAllPostController)

// get all user for admin
router.get('/admin/all-user',userController.getAllUserController)

module.exports = router