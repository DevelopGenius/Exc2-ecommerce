import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import appModule from "../css/App.module.css";

const Header = () => {
  let navigate = useNavigate();

  // Redirect to main page (App)
  const handleHistoryToApp = () => {
    navigate("/");
  };

  // Redirect to Cart
  const handleHistoryToCart = () => {
    navigate("/cart");
  };

  return (
    <div className={appModule.header}>
      <div className={appModule.title} onClick={handleHistoryToApp}>Ecommerce Exc2</div>
      <button className={appModule.headerButton} onClick={handleHistoryToCart}>
        <FaShoppingCart className={appModule.cartIcon} />
      </button>
    </div>
  );
};

export default Header;
