import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemsToCart(state, action) {
      const newItem = action.payload;
      const exsitingItem = state.items.find((item) => item.id === newItem.id);
      if (!exsitingItem) {
        state.items.push({
          itemId: newItem.id,
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
  },
});
