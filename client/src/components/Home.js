import React, { useContext } from "react";
// import { useNavigate } from "react-router";
import { WebshopProvider, WebshopContext } from "../context/context";
import ProductsPage from "./products/productsPage";
import LoadingSquares from "./products/loadingSquares/LoadingSquares";
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
        <Link to="/loadingSquare">loading square</Link>
        <Link to="/loadingFigure">loading figure</Link>
        <Link to="/loadingCircles">loading circles</Link>


      </div>
    </WebshopProvider>
  );
}
export default Home;
