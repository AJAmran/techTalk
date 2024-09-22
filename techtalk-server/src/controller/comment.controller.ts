import { Request, Response } from "express";
import { commentSchema } from "../validation/comment.validation";
import Post from "../models/Post.model";
import Comment from "../models/comment.model";

// Create a comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId, content, parentCommentId } = commentSchema.parse(req.body);
    const userId = req.user?.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = await Comment.create({
      content,
      author: userId,
      postId,
      parentCommentId: parentCommentId || null,
    });

    post.comments.push(newComment._id.toString());
    await post.save();

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

// Get comments by postId
export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username avatar",
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post.comments);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is the comment author or an admin
    if (comment.author.toString() !== req.user?.id?.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this comment" });
    }

    comment.content = content || comment.content;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is the comment author or an admin
    if (
      comment.author.toString() !== req.user?.id?.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

// Get all comments (Admin)
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find().populate("author", "username avatar");

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
