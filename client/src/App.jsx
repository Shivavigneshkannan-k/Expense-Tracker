import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import ViewTransaction from "./Pages/ViewTransactions";
import AddTransaction from "./Pages/AddTransaction";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { setUser } from "./redux/userSlice";
import { useEffect } from "react";

function App() {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true
      });
      dispatch(setUser(response.data.data));
    } catch (err) {
      console.log(err.response.data.message||"error in get user");
    }
  };
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <div>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Signup />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/transactions'
            element={user ? <ViewTransaction /> : <Navigate to='/' />}
          />
          <Route
            path='/addTransactions'
            element={user ? <AddTransaction /> : <Navigate to='/' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
