// src/pages/LoginPage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, resetState } from "../features/userSlice";
import { toast } from "react-toastify";

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isSuccess, message, isError } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      setFormData(INITIAL_FORM_DATA);
      dispatch(resetState());
      navigate("/");
    } else if (isError) {
      toast.error(message);
      dispatch(resetState);
    }
  }, [isSuccess, isError, message, resetState, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-12 px-4">
      <div className="w-full max-w-md bg-white drop-shadow-2xl rounded-2xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              placeholder="Enter your email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                placeholder="Enter your password"
                value={formData.password || ""}
                onChange={handleChange}
                autoComplete="password"
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-3 text-cyan-500 hover:text-cyan-700 font-semibold focus:outline-none text-md"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
          >
            Login
          </button>

          <hr className="my-4" />

          <div className="flex items-center justify-center space-x-2">
            <span>Don't have an account?</span>
            <Link
              to="/register"
              className="text-cyan-500 hover:text-cyan-700 font-bold"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
