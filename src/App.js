import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./components/store/ui-slice";
import Notification from "./components/UI/Notification.js";
function App() {
  const showCart = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCardData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending...",
          title: "Sending",
          message: "Sending Cart Data!",
        }),
      );
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

      // const responseData = await response.json();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending Cart Data Is Done!",
        }),
      );
    };
    sendCardData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart Data Failed!",
        }),
      );
    });
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
