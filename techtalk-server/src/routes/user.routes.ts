import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/users", getAllUsers);
