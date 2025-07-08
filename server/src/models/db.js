import {Pool} from "pg"
import dotenv from "dotenv"; 
dotenv.config();
const DB = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ExpenseTracker",
  password: process.env.DB_PASSWORD,
  port: "5432"
});

export default DB;
