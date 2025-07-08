import express from "express";
import { chatWithGemini } from "../controllers/chat.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { userAuth } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",asyncHandler(userAuth), chatWithGemini);

export default router;
