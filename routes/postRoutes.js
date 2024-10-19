import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  commentPost,
  createPost,
  deletePost,
  getComments,
  getPost,
  getPosts,
  getUserPost,
  likePost,
  likePostComment,
  replyPostComment,
} from "../controllers/postController.js";

const router = express.Router();

// CREATE POSTS
router.post("/create-post", userAuth, createPost);

// GET POSTS
router.post("/", userAuth, getPosts);
router.post("/:id", userAuth, getPost);

router.post("/get-user-post/:id", userAuth, getUserPost);

// GET COMMENTS
router.get("/comments/:postId", getComments);

// LIKE AND COMMENT ON POSTS
router.post("/like/:id", userAuth, likePost);
router.post("/like-comment/:id/:rid?", userAuth, likePostComment);
router.post("/comment/:id", userAuth, commentPost);
router.post("/reply-comment/:id", userAuth, replyPostComment);

// DELETE POST
router.delete("/:id", userAuth, deletePost);

export default router;
