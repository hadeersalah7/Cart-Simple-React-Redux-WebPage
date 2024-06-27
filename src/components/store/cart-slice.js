import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending...",
        title: "Sending",
        message: "Sending Cart Data!",
      }),
    );

    const responseData = async () => {
      const response = await fetch(
        "https://redux-cart-80000-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await responseData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending Cart Data Is Done!",
        }),
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart Data Failed!",
        }),
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
