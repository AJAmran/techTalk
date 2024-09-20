import { NextFunction, Request, Response } from "express";
import { TPost } from "../interface/post.interface";
import Post from "../models/Post.model";
import { CustomError } from "../utils/customError";

//Create a new Post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, categories, imageUrl, author } = req.body as TPost;

    const post = await Post.create({
      title,
      content,
      categories,
      imageUrl,
      author,
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// get all post
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

// get post by Id
export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new CustomError("Post not found", 404));
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

//Update post

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return next(new CustomError("Post not found", 404));
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    next(error);
  }
};

//Delete Post

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return next(new CustomError("Post not found", 404));
    }
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
