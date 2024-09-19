import { Router } from "express";

const router = Router();

router.post('/register', "CreateUser");
router.post("/login", "loginUser")
router.get("/profile", "authenticate", "getUserProfile")
