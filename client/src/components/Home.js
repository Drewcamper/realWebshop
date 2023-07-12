import React, { useContext } from "react";
import { WebshopProvider, WebshopContext } from "../context/context";
import ProductsPage from "./products/productsPage";

import "../style/home.css";
import Header from "./header/Header";
import Welcome from "./main/Welcome";
import Footer from "./footer/Footer";
function Home() {
const { priceSum } = useContext(WebshopContext);

return (
  <WebshopProvider>
    <div className="home">
      <Header />
      <Welcome />
      <ProductsPage priceSum={priceSum} />
      <Footer />
    </div>
  </WebshopProvider>
);
}
export default Home;
