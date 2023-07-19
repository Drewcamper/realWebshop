import React, { useContext, useEffect } from "react";
import { WebshopProvider, WebshopContext } from "../context/context";
import ProductsPage from "./products/productsPage";

import "../style/home.css";
import Menu from "./header/Menu";
import Cart from "./header/Cart";
import Welcome from "./main/Welcome";
import CustomerSupport from "./chat/Chat";
function Home() {
  const { priceSum, openMenu, openCart } = useContext(WebshopContext);
  // useEffect(() => {
  //   console.log({ menu: openMenu, cart: openCart });
  // }, [openMenu, openCart]);

  return (
    <WebshopProvider>
      <div className="home">
        <Menu />
        <Cart />
        <Welcome />
        <ProductsPage priceSum={priceSum} />
        <CustomerSupport />
      </div>
    </WebshopProvider>
  );
}
export default Home;
