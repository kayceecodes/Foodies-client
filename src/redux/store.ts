"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import counterReducer from './slices/counterSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer
  },
});

export default store;