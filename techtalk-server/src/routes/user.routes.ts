import express from "express";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/user.controller";
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);

router.get("/:userId", verifyToken, getUser);

router.put("/:userId", verifyToken, updateUser);

router.delete("/:userId", verifyToken, verifyAdmin, deleteUser);

export default router;
