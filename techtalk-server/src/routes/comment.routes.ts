import express from "express";
import {
  verifyAdmin,
  verifyAuthor,
  verifyToken,
} from "../middleware/auth.middleware";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentsByPost,
  updateComment,
} from "../controller/comment.controller";

const router = express.Router();

router.post("/", verifyToken, createComment);

router.get("/:postId", getCommentsByPost);

router.put("/:commentId", verifyToken, verifyAuthor, updateComment);

router.delete("/:commentId", verifyToken, verifyAuthor, deleteComment);

router.get("/", verifyToken, verifyAdmin, getAllComments);

export default router;
