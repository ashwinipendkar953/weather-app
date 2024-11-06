// src/context/UserContext.js
import React, { createContext, useReducer, useContext, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

const UserContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_PENDING":
    case "LOGIN_PENDING":
      return { ...state, isLoading: true, isError: false };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: action.payload.message,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
      };
    case "LOGOUT":
      return {
        ...initialState,
        isSuccess: true,
        message: "Logged out successfully",
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case "RESET":
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: null,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.isSuccess) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
      toast.success(state.message);
      setTimeout(() => {
        resetState();
      }, 500);
    } else if (state.isError) {
      toast.error(state.message);
      resetState();
    }
  }, [state]);

  const register = async (formData) => {
    dispatch({ type: "REGISTER_PENDING" });
    try {
      const response = await api.post(`/users/register`, formData);
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response?.data?.message });
    }
  };

  const login = async (formData) => {
    dispatch({ type: "LOGIN_PENDING" });
    try {
      const response = await api.post(`/users/login`, formData);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response?.data?.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    dispatch({ type: "RESET" });
  };

  const resetState = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <UserContext.Provider
      value={{ state, register, login, logout, resetState }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
