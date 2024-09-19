import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { TUser } from "../interface/user.interface";

interface CustomRequest extends Request {
  user?: TUser;
}

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Fetch user and check for null
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Assign user to the request object
    req.user = user;

    next();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (...roles: Array<TUser["role"]>) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Not authorized to perform this action" });
    }
    next();
  };
};
