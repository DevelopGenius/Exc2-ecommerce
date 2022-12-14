import CurrencyFormat from "react-currency-format";
import cartModule from "../css/Cart.module.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useState } from "react";

const Cart = (props) => {
  const { cartItems, orderCart } = props;
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const getPhone = (event) => {
    setPhone(event.target.value);
    console.log(phone);
  }

  const getAddress = (event) => {
    setAddress(event.target.value);
  }

  const getName = (event) => {
    setName(event.target.value);
  }

  return (
    <div className={cartModule.cart}>
      {cartItems.length === 0 ? (
        <div className={cartModule.cartHeader}>Cart is empty</div>
      ) : (
        <div className={cartModule.cartHeader}>
          You have {cartItems.length} items in the cart{" "}
        </div>
      )}
      <div>
        <div className={cartModule.cart}>
          <ul className={cartModule.cartItems}>
            {cartItems.map((item) => (
              <li className={cartModule.cartItemsList} key={item.id}>
                <div className={cartModule.cartItemsImgDiv}>
                  <img
                    className={cartModule.cartItemsImg}
                    src={item.image}
                    alt={item.title}
                  ></img>
                </div>
                <div className={cartModule.cartItem}>
                  <div className={cartModule.title}>{item.title}</div>
                  <div className={cartModule.cartItemDetails}>
                    <div className={cartModule.right}>
                      <CurrencyFormat
                        value={item.price.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />{" "}
                      x {item.count}
                      {"  "}
                      <button
                        className={cartModule.removeButton}
                        onClick={() => props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                      <FaPlusCircle
                        className={cartModule.plusIcon}
                        onClick={() => props.addOneToCart(item)}
                      />
                      <FaMinusCircle
                        className={cartModule.minusIcon}
                        onClick={() => props.removeOneFromCart(item)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {cartItems.length !== 0 && (
            <div>
              <div className={cartModule.customerDetails}>
                <h2>Please fill out your details below:</h2>
                <input placeholder="your name" onChange={getName}></input>
                <input placeholder="your phone" onChange={getPhone}></input>
                <input placeholder="your address" onChange={getAddress}></input>
              </div>
              <div className={cartModule.total}>
                <div className={cartModule.totalDiv}>
                  Total:{" "}
                  <CurrencyFormat
                    value={cartItems
                      .reduce((itm1, itm2) => itm1 + itm2.price * itm2.count, 0)
                      .toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <button className={cartModule.totalButton} onClick={() => orderCart(name, address, phone)}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
