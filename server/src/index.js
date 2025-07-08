import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import DB from "./models/db.js"; // Adjust the import based on your actual DB export
import authRouter from "./routers/auth.router.js";
import transactionRouter from "./routers/transaction.router.js";
import chatRouter from "./routers/chat.router.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/chat",chatRouter);

const testDB = async () => {
  try {
    const result = await DB.query("SELECT NOW()");
    console.log("DB connection established at: ", result.rows[0].now);
    return true;
  } catch (err) {
    console.error("DB connection failed", Date.now());
    return false;
  }
};
const startServer = async () => {
  const success = await testDB();
  if (success) {
    app.listen(PORT, () => {
      console.log("app is running on port ", PORT);
    });
  }
};

startServer();
