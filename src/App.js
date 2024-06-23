import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { UseSelector, useSelector } from "react-redux";
function App() {
  const cart = useSelector((state) => state.ui.isCartVisible);
  return (
    <Layout>
      {cart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
