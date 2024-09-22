import express from "express";
import { verifyAuthor, verifyToken } from "../middleware/auth.middleware";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/post.controller";

const router = express.Router();

router.post("/", verifyToken, createPost);

router.get("/", getPosts);

router.get("/:postId", getPostById);

router.put("/:postId", verifyToken, updatePost);

router.delete("/:postId", verifyToken, deletePost);

export default router;
