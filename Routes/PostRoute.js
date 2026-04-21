const express = require("express");
const PostRouter=express.Router();
const{createPost,getPosts,likePost,addComment}=require("../Controller/PostController");
// const auth = require("../middleware/auth");

PostRouter.post("/create", createPost); 
PostRouter.get("/", getPosts);
PostRouter.post("/:id/like", likePost);
PostRouter.post("/:id/comment",addComment);

module.exports = PostRouter;