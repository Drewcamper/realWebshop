import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import '../../style/header/header.css'

function Header() {
  return (
    <div className="header">
      <div className="headerFlexbox">
        <Auth />
        <button>
          <Link to="/cart" className="cartButton">
            cart
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
