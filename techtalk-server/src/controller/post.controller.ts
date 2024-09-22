/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import { postSchema } from "../validation/post.validation";
import Post from "../models/Post.model";
import { z } from "zod";

export const createPost = async (req: Request, res: Response) => {
  try {
    const validatedData = postSchema.parse(req.body);
    const post = await Post.create({ ...validatedData, author: req.user?.id });
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ status: "published" })
      .populate("author")
      .exec();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author")
      .exec();
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    console.log("udpddd")
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updatedData = postSchema.parse(req.body);
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      updatedData,
      {
        new: true,
      }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
