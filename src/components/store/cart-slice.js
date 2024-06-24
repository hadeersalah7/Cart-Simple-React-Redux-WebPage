import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemsToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      const exsitingItem = state.items.find((item) => item.id === newItem.id);
      if (!exsitingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        exsitingItem.quantity++,
          (exsitingItem.totalPrice = exsitingItem.totalPrice + newItem.price);
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      const exsitingItem = state.items.find((item) => item.id === id);
      if (exsitingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        exsitingItem.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
