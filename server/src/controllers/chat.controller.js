import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import DB from "../models/db.js";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithGemini = async (req, res) => {
  const { message } = req.body;
  const user_id = req.user?.user_id;

  if (!message) return res.status(400).json({ message: "Message is required" });
  if (!user_id) return res.status(401).json({ message: "Unauthorized" });

  try {
    // ✅ Fetch ALL transactions (not just 2 months)
    const { rows: transactions } = await DB.query(
      `
      SELECT title, amount, type, transaction_time
      FROM transactions
      WHERE user_id = $1
      ORDER BY transaction_time DESC
      `,
      [user_id]
    );

    if (transactions.length === 0) {
      return res.json({
        text: "You don't have any transactions yet."
      });
    }

    // 🧾 Format: date | type | title | amount
    const formatted = transactions
      .map((tx) => {
        const date = new Date(tx.transaction_time).toLocaleDateString("en-IN");
        return `${date} | ${tx.type} | ${tx.title} | ₹${tx.amount}`;
      })
      .join("\n");

    // Gemini Prompt
    const prompt = `
You are a personal finance assistant integrated into a budget tracking application.

Below is the full transaction history of a user, listed as:
[Date] | [Type] | [Title] | [Amount]

Example:
01/07/2025 | income | salary | ₹50000  
02/07/2025 | expense | rent | ₹10000  
03/07/2025 | expense | groceries | ₹2000

---

🎯 Rules:
- Use ONLY the transaction history to answer the user's questions.
- Do NOT answer any questions unrelated to personal finance (e.g., politics, news, weather).
- If the question cannot be answered with this data, say:
  "I don't have enough information to answer that."
- You can give future recommendations or budget plans based on the user's current patterns.

---

📊 User’s Full Transaction History:
${formatted}

💬 User Question:
${message}
`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ message: "Gemini API error", error: err.message });
  }
};
