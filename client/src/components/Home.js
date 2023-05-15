import React, { useContext } from "react";
// import { useNavigate } from "react-router";
import { WebshopProvider, WebshopContext } from "../context/context";
import ProductsPage from "./products/productsPage";
import Auth from "./header/Auth";
import { Link } from "react-router-dom";

import "../style/home.css";
// import cartButton from './images/cartLogo.png'

function Home() {
  const { priceSum } = useContext(WebshopContext);

  return (
    <WebshopProvider>
      <div className="home">
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
        <div>
          <ProductsPage priceSum={priceSum}/>
        </div>
      </div>
    </WebshopProvider>
  );
}
export default Home;
