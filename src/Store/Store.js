import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartReducer.js";

export const Store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});
