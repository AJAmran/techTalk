import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Comment from "../models/comment.model";

interface UserPayload {
  _id: string;
  role: "admin" | "author" | "reader";
}

// Middleware to verify JWT token (Authentication)
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.token;
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract Bearer token
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, no token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    req.user = decoded;

    next();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to verify Admin role (Authorization)
export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const user = await User.findById(req.user?.id);

  if (user && user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied, admin role required" });
  }
};

// Middleware to verify Author role (Authorization for comment management)
export const verifyAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const commentId = req.params.commentId;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // Allow if the user is the author of the comment or an admin
  if (
    comment.author.toString() === userId?.toString() ||
    req.user?.role === "admin"
  ) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied, not the author of the comment" });
  }
};
