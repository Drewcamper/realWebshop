import React, { useState, useContext, useRef } from "react";
import { WebshopContext } from "../../context/context";
import "../../style/header/menu.css";
import Auth from "./Auth";

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const { products, scrollView, setScrollView } = useContext(WebshopContext);

  const productNamesTemplates = products.map((product) => {
    const handleScrollTo = () => {
        document.getElementById(product.id).scrollIntoView({ behavior: 'smooth' })
    };
    return (
      <div key={product.id} className="menuNameWrapper" id={products.id}>
        <div className="productName" onClick={handleScrollTo}>
          {product.name}
        </div>
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
      //   onClick={handleMenuToggleByClick}
    >
      <div className="menuButton">
        {!openMenu ? (
          <div className="closedMenu">menu</div>
        ) : (
          <div>
            {productNamesTemplates}
            <Auth />
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
