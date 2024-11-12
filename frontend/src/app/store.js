import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import cityReducer from "../features/citySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    city: cityReducer,
  },
});

export default store;
