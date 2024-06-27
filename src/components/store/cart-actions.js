import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-cart-80000-default-rtdb.firebaseio.com/cart.json",
      );
      if (!response.ok) {
        throw new Error("Couldn't fetch cart data!");
      }
      const data = response.json();
      return data;
    };

    try {
      const fetchedCart = await fetchData();
      dispatch(cartActions.replaceCart(fetchedCart));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching Cart Data Failed!",
        }),
      );
    }
  };
};

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
