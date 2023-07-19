import React, { useContext, useEffect } from "react";
import { WebshopContext } from "../../context/context";
import "../../style/header/menu.css";
import Auth from "./Auth";

function Menu() {
  const { products, openMenu, setOpenMenu, openCart, setOpenCart } = useContext(WebshopContext);

  const handleScrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const productNames = products.map((product) => (
    <div
      className="menuProductName"
      key={product.id}
      id={product.id}
      onClick={() => handleScrollTo(product.id)}>
      {product.name}
    </div>
  ));

  const handleMenuToggleByHover = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  const handleMenuToggleByClick = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
    if (openCart && openMenu) {
      setOpenCart(false);
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && openMenu) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const ClosedMenu = () => (
    <div className="closedMenu">
      <div className="rotatedMenu">menu</div>
    </div>
  );

  const OpenedMenu = () => (
    <div className="openedMenu">
      {productNames}
      <Auth />
    </div>
  );

  const MenuToggle = () =>
    window.screen.width < 800 ? (
      !openCart && !openMenu ? (
        <ClosedMenu />
      ) : !openCart && openMenu ? (
        <OpenedMenu />
      ) : openCart ? (
        <></>
      ) : null
    ) : openMenu ? (
      <OpenedMenu />
    ) : (
      <ClosedMenu />
    );

  return (
    <div
      className="menuWrapper"
      onMouseEnter={handleMenuToggleByHover}
      onMouseLeave={handleMenuToggleByHover}
      onClick={handleMenuToggleByClick}>
      <MenuToggle />
    </div>
  );
}

export default Menu;
