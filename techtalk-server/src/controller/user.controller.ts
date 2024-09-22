import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

// Helper function to hash passwords
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").lean();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the request is made by an admin or the user themselves
    if (user?.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username, email, role, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the request is made by an admin or the user themselves
    if (req.user?.role !== "admin" && req.user?.id !== userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (role && req.user.role === "admin") user.role = role;
    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only admins can delete users
    if (user?.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password").lean();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser.id,
      name: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error", error: (error as Error).message });
  }
};
