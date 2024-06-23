import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummyData = [
  {
    id: "1",
    price: 100,
    title: "My First Book",
    description: "The first book I've ever had",
  },
  {
    id: "2",
    price: 200,
    title: "My Second Book",
    description: "The second book I've ever had",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummyData.map((product) => (
          <ProductItem
            key={product.id}
            title={product.title}
            id={product.id}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
