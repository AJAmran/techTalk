import { NextFunction, Request, Response } from "express";
import { TComment } from "../interface/comment.interface";
import Comment from "../models/comment.model";
import { CustomError } from "../utils/customError";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, postId, userId } = req.body as TComment;

    const comment = await Comment.create({ content, postId, userId });
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

//get all comment for a post
export const getCommentsByPostId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate(
      "userId"
    );
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

//Approve or disapprove a comment
export const approvedComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentId = req.params.id;
    const isApproved = req.body.isApproved;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { isApproved },
      { new: true }
    );

    if (!updatedComment) {
      return next(new CustomError("Comment not found", 404));
    }

    res.status(200).json({ success: true, data: updatedComment });
  } catch (error) {
    next(error);
  }
};
