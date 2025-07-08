import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  loading: false,
  error: null
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
      state.error = null;
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
      state.error= null;
    },
    removeTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (t) => t.transaction_id !== action.payload
      );
    },
    setTransactionLoading(state, action) {
      state.loading = action.payload;
    },
    setTransactionError(state, action) {
      state.error = action.payload;
    },
    clearTransactions(state) {
      state.transactions = [];
      state.error = null;
    }
  }
});

export const {
  setTransactions,
  addTransaction,
  removeTransaction,
  setTransactionLoading,
  setTransactionError,
  clearTransactions
} = transactionSlice.actions;
export default transactionSlice.reducer;
