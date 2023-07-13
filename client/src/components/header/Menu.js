import React, { useState, useContext, useRef } from "react";
import { WebshopContext } from "../../context/context";
import "../../style/header/menu.css";
import Auth from "./Auth";

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const { products } = useContext(WebshopContext);

  const productNamesTemplates = products.map((product) => {
    const handleScrollTo = () => {
      document.getElementById(product.id).scrollIntoView({ behavior: "smooth" });
    };
    return (
      <div className="menuProductName" key={product.id} id={products.id} onClick={handleScrollTo}>
        {product.name}
      </div>
    );
  });

  const handleMenuToggleByHover = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };
  const handleMenuToggleByClick = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };

  return (
    <div
      className="menuWrapper"
      onMouseEnter={handleMenuToggleByHover}
      onMouseLeave={handleMenuToggleByHover}
      onClick={handleMenuToggleByClick}>
      {!openMenu ? (
        <div className="closedMenu">
          <div className="rotatedMenu">menu</div>
        </div>
      ) : (
        <div className="openedMenu">
          {productNamesTemplates}
          <Auth />
        </div>
      )}
    </div>
  );
}

export default Menu;
