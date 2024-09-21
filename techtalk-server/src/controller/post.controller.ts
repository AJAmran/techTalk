import { Request, Response } from 'express';
import { postSchema } from '../validation/post.validation';
import Post from '../models/Post.model';


export const createPost = async (req: Request, res: Response) => {
  try {
    const validatedData = postSchema.parse(req.body);
    const post = await Post.create({ ...validatedData, author: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find({ status: 'published' }).populate('author').exec();
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const posts = await Post.findById(req.params.id).populate('author').exec();
  res.json(posts);
};

export const updatePost = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const updatedData = postSchema.parse(req.body);
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Check if the user is the author or an admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Use findByIdAndDelete() to remove the post
    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted' });
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
