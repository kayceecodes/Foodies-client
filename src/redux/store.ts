"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import counterReducer from './slices/counterSlice'
import postSlice from "./slices/postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    post: postSlice,
  },
});

export default store;