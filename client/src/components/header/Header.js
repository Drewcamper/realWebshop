import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import "../../style/header/header.css";
import { WebshopContext } from "../../context/context";
function Header() {
  const { priceSum } = useContext(WebshopContext);

  return (
    <div className="header">
      <Auth />
      <button>
        <Link to="/cart" className="cartButton">
          cart
          {priceSum !== 0 && <div className="cartSum">{priceSum} $</div>}
        </Link>
      </button>
    </div>
  );
}

export default Header;
