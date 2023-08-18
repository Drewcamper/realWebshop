import React, { useContext } from "react";
import { WebshopProvider, WebshopContext } from "../context/context";
import ProductsPage from "./products/productsPage";


import "../style/home.css";
import Menu from "./header/Menu";
import Cart from "./header/Cart";
import Welcome from "./main/Welcome";
import CustomerSupport from "./chat/Chat";
import AlertBox from "./header/AlertBox";
function Home() {
  const { priceSum } = useContext(WebshopContext);

  return (
    <WebshopProvider>
      <div className="home">
        <CustomerSupport />
        <Menu />
        <Cart />
        <Welcome />
        <ProductsPage priceSum={priceSum} />
        <AlertBox />
      </div>
    </WebshopProvider>
  );
}
export default Home;
