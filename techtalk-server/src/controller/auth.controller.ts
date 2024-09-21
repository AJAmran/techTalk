import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { registerSchema } from "../validation/auth.validation";

export const signUp = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await User.create(validatedData);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  res.json({ token });
};
