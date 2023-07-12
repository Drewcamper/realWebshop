import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "../../style/header/header.css";
import { WebshopContext } from "../../context/context";
function Header() {
  const { priceSum } = useContext(WebshopContext);

  return (
    <div className="header">
      <Menu />
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
