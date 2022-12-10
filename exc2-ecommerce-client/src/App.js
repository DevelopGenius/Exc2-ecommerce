import appModule from "./css/App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
// Notification
import { ReactNotifications, Store } from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";

const App = () => {
  //let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Setting up all the products
  useEffect(() => {
    fetch("http://127.0.0.1:3001/products")
      .then((res) => res.json())
      .then((json) => setProducts(json.map(product => {
        return { ...product, id: product._id }
      })));
  }, []);

  const productToCartItem = (product) => {
    let item = {
      id: product.id,
      image: product.image,
      title: product.title,
      description: product.description,
      price: product.price,
      count: 0,
    };

    return item;
  };

  // Notification for adding an item
  const successNotification = (title) => {
    Store.addNotification({
      title: "Item added to the cart!",
      message: title + " added successfully",
      type: "success",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  };

  // Notification for removing an item
  const removeNotification = (title) => {
    Store.addNotification({
      title: "Item removed from cart!",
      message: title + " removed from cart",
      type: "danger",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
    });
  }

  // Adding an item to the cart
  const addToCart = (product) => {
    let alreadyInCart = false;
    cartItems.forEach((prd) => {
      if (prd.id === product.id) {
        prd.count++;
        alreadyInCart = true;
        setCartItems((prev) => [...prev]);
      }
    });
    if (!alreadyInCart) {
      let tempItem = productToCartItem(product);
      tempItem.count = 1;
      setCartItems((prev) => [...prev, tempItem]);
    }

    successNotification(product.title);
  };

  // Removing an item from the cart
  const removeFromCart = (product) => {
    let cartItemsTemp = cartItems.slice();
    setCartItems(cartItemsTemp.filter((prd) => prd.id !== product.id));
    removeNotification(product.title);
  };

  // Adding one item to the cart
  const addOneToCart = (item) => {
    cartItems.forEach((prd) => {
      if (prd.id === item.id) {
        prd.count++;
      }
    });

    setCartItems(prev => [...prev]);
  }

  // Removing one item from the cart 
  const removeOneFromCart = (item) => {
    let cartItemsTemp = cartItems.slice();
    let index = 0;
    cartItems.forEach((prd) => {
      if (prd.id === item.id) {
        prd.count--;
        if (prd.count === 0) {
          cartItemsTemp.splice(index, 1);
          removeNotification(item.title);
        }
      }
      index++;
    });
    setCartItems(cartItemsTemp);
  }

  const orderCart = (name, address, phone) => {
    fetch("http://127.0.0.1:3001/placeOrder",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, address, phone, orderProducts: cartItems.map(cartItem => {
            return { product: { _id: cartItem.id, }, amount: cartItem.count }
          })
        })
      })
  }

  return (
    <Router>
      <div className={appModule.gridContainer}>
        <Header />
        <Routes>
          <Route
            element={
              <div className={appModule.main}>
                <div className={appModule.content}>
                  <Products products={products} addToCart={addToCart} />
                </div>
              </div>
            }
            path="/"
          ></Route>
          <Route
            element={
              <Cart cartItems={cartItems}
                removeFromCart={removeFromCart}
                removeOneFromCart={removeOneFromCart}
                addOneToCart={addOneToCart}
                orderCart={orderCart}
                />
            }
            path="/cart"
          ></Route>
        </Routes>
        <ReactNotifications />
      </div>
    </Router>
  );
};

export default App;
