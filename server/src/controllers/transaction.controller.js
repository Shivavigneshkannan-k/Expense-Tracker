import DB from "../models/db.js";
import { v4 as uuid } from "uuid";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addTransaction = async (req, res, next) => {
  console.log(req.body)
  const { title, amount, type, date } = req.body;
  const user_id = req.user?.user_id;
  console.log("id",user_id)
  // Basic validation
  if (!title || !amount || !type || !date || !user_id) {
    return res.status(400).json({ message: "backend: All fields are required." });
  }

  const transactionId = uuid();

  const result = await DB.query(
    `INSERT INTO transactions 
        (transaction_id, user_id, title, amount, type, transaction_time) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
    [
      transactionId,
      user_id,
      title,
      amount,
      type,
      new Date(date) // converts to proper timestamp
    ]
  );

  const response = new ApiResponse(
    "Transaction created successfully",
    result.rows[0],
    201
  );
  res.status(201).json(response);
};

const removeTransaction = async (req, res, next) => {
  const { id } = req.params;

  const user_id = req.user.user_id;
  const result = await DB.query(
    "delete from transactions where transaction_id = $1 and user_id = $2",
    [id, user_id]
  );
  if (result.rowCount == 0) {
    throw new ApiError("Transaction not found", 404);
  }
  const response = new ApiResponse(
    "Transaction deleted successfully",
    null,
    200
  );
  res.status(200).json(response);
};

const getAllTransactions = async (req, res, next) => {
  const user_id = req.user.user_id;
  const result = await DB.query(
    "SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_time DESC",
    [user_id]
  );
  const response = new ApiResponse(
    "Transaction deleted successfully",
    result.rows,
    200
  );
  res.status(200).json(response);
};

export { removeTransaction, addTransaction, getAllTransactions };
