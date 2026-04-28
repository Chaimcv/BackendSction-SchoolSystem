const express = require("express");
const PostRouter = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment
} = require("../Controller/PostController");
const auth = require("../middleware/auth");
const upload = require("../middleware/uploads");

// Basic Feed (Public)
PostRouter.get("/", getPosts);

// Protected Interactions
PostRouter.post("/create", auth, upload.single("postImage"), createPost);
PostRouter.put("/:id", auth, upload.single("postImage"), updatePost);
PostRouter.delete("/:id", auth, deletePost);
PostRouter.post("/:id/like", auth, likePost);
PostRouter.post("/:id/comment", auth, addComment);

module.exports = PostRouter;