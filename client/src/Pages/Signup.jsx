import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store=>store.user.user);
  useEffect(()=>{
    if(user){
      return navigate("/transactions")
    }
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setMsg("Signup successful! Please login.");
        if (res.data && res.data.data) {
          dispatch(setUser(res.data.data));
        }
      } else setMsg(res.data.message || "Signup failed");
    } catch (error) {
      console.error("Signup error:", error);
      setMsg("Network error: " + error);
    }
  };

  return (
    <section className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8'>
        <p className='text-2xl font-bold text-center text-gray-900 dark:text-white mb-6'>
          Create an account
        </p>
        {msg && (
          <div
            className={`mb-4 text-center text-sm rounded p-2 ${
              msg.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
            {msg}
          </div>
        )}
        <form
          className='space-y-5'
          onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='username'
              className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200'>
              Username
            </label>
            <input
              id='username'
              name='username'
              value={form.username}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500'
              required
              autoComplete='username'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={form.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500'
              required
              autoComplete='email'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              value={form.password}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500'
              required
              autoComplete='new-password'
            />
          </div>

          <button
            type='submit'
            className='bg-blue-500 w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'>
            Create an account
          </button>
        </form>
        <p className='mt-6 text-center text-sm text-gray-600 dark:text-gray-300'>
          Already have an account?{" "}
          <span
            type='button'
            className='text-primary-600 hover:underline dark:text-primary-400 font-medium'
            onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </section>
  );
}
