import express from "express";
import { signup, signin, logout, getUser } from "../controllers/auth.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { userAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/signin", asyncHandler(signin));
router.post("/logout", asyncHandler(logout));
router.get("/user", asyncHandler(userAuth),asyncHandler(getUser));

export default router;
