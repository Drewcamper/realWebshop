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
        <div>
          <ProductsPage priceSum={priceSum} />
        </div> 
        <Footer />
        {/* <Link to="/loadingAnimation">
          animation
        </Link> */}
      </div>
    </WebshopProvider>
  );
}
export default Home;
