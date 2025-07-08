import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer
  }
});

export default store;
