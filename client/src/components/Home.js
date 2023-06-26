import React, { useContext } from "react";
// import { useNavigate } from "react-router";
import { WebshopProvider, WebshopContext } from "../context/context";
import ProductsPage from "./products/productsPage";
import Auth from "./header/Auth";
import { Link } from "react-router-dom";

import "../style/home.css";
import Footer from "./footer/Footer";
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
        <ProductsPage priceSum={priceSum} />
        <Footer />
        <Link to="/loadingSphere">loading sphere</Link>
        <Link to="/loadingSquare">loading square</Link>
        <Link to="/formsAnimation">forms animation</Link>
        <Link to="/connectionAnimation">connection animation</Link>

      </div>
    </WebshopProvider>
  );
}
export default Home;
