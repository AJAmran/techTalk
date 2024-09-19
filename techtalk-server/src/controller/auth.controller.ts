import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.validation";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenGenerator";
import { ZodError } from "zod";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Parse and validate input using Zod schema
    const parsed = registerSchema.parse(req.body);
    const { username, email, password, role } = parsed;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Set token in cookies (httpOnly)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(201).json({ success: true, user, token });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }

    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Parse and validate input using Zod schema
    const parsed = loginSchema.parse(req.body);
    const { email, password } = parsed;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Set token in cookies (httpOnly)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ success: true, user, token });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }

    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
