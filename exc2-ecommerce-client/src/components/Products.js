import CurrencyFormat from "react-currency-format";
import productsModule from "../css/Products.module.css";

const Products = (props) => {
  return (
    <div>
      <ul className={productsModule.products}>
        {props.products.map((product) => (
          <li className={productsModule.productsList} key={product.id}>
            <div className={productsModule.product}>
              <img
                className={productsModule.productImg}
                src={product.image}
                alt={product.title}
              ></img>
              <p>{product.title.toString().substr(0, 30) + "..."}</p>
              <p>
                Description:{" "}
                {" " + product.description.toString().substr(0, 20) + "..."}
              </p>
              <div className={productsModule.productPrice}>
                <CurrencyFormat
                  className={productsModule.productPrice}
                  value={product.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  className={productsModule.buttonPrimary}
                  onClick={() => props.addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
