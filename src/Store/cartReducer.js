import { createSlice } from "@reduxjs/toolkit";

let dataFromWeb = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
  name: "SliceNamecart",
  initialState: dataFromWeb,
  reducers: {
    additem(state, action) {
      state.push(action.payload);

      localStorage.setItem("cart", JSON.stringify([...state]));
    },
    removeitem(state, action) {
      let removeitem = state.filter(
        (cartProducts) => cartProducts.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify([...removeitem]));
      return removeitem;
    },
  },
});

export default cartSlice.reducer;
export let { additem, removeitem } = cartSlice.actions;
