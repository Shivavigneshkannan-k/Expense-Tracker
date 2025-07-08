import DB from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check if user exists
  const userExists = await DB.query("SELECT * FROM users WHERE email = $1", [
    email
  ]);
  if (userExists.rows.length > 0) {
    throw new ApiError("user already exist", 409);
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Generate UUID
  const user_id = uuidv4();
  // Insert user
  const newUser = await DB.query(
    "INSERT INTO users (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, username, email, hashedPassword]
  );
  const token = jwt.sign(
    { id: user_id, email: newUser.rows[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  const response = new ApiResponse("Signup successful", newUser.rows[0], 201);
  return res.status(201).json(response);
};

// Signin Controller
export const signin = async (req, res) => {
    console.log("body",req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError("Email and password required", 400);
  }

  const userRes = await DB.query("SELECT * FROM users WHERE email = $1", [
    email
  ]);
  if (userRes.rows.length === 0) {
    throw new ApiError("Invalid credentials", 401);
  }
  const user = userRes.rows[0];
  // Compare password
  console.log(user);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError("Invalid password", 401);
  }
  // Generate JWT
  const token = jwt.sign(
    { id: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  const response = new ApiResponse(
    "Signin successful",
    { id: user.user_id, username: user.username, email: user.email },
    200
  );
  return res.status(200).json(response);
};

// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token");
  const response = new ApiResponse("logged out successfully", null, 200);
  
  return res.status(200).json(response);
};
export const getUser = (req,res)=>{
  const response = new ApiResponse("logged out successfully", req.user, 200);
  return res.status(200).json(response);
}
