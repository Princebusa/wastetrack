import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addComment,
  votePost,
  removeVote,
} from "../controllers/post.controller.js";

import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();

import multer from 'multer';

const upload = multer({
    storage : multer.memoryStorage(),
});

// CRUD
router.post("/", upload.single("image"), createPost);     // Create post (no auth required for anonymous)
router.get("/", getPosts);                        // Read all posts
router.get("/:id", getPostById);                  // Read one post
router.put("/:id", authenticate, updatePost);   // Update post
router.delete("/:id", authenticate, deletePost);// Delete post

// Voting
router.post("/:postId/vote", authenticate, votePost);     // Vote on post
router.delete("/:postId/vote", authenticate, removeVote); // Remove vote

// Comments
router.post("/:id/comment", authenticate, addComment); // Add comment

export default router;






