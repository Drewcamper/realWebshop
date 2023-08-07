import React, { useContext, useEffect } from "react";
import { WebshopContext } from "../../context/context";
import "../../style/header/menu.css";
import Auth from "./Auth";
const Menu = () => {
  const {
    animationProducts,
    smallProducts,
    openMenu,
    setOpenMenu,
    openCart,
    setOpenCart,
    currentWindowLocation,
    setCurrentWindowLocation,
  } = useContext(WebshopContext);

  const handleScrollTo = (id) => {
    setCurrentWindowLocation(id);
  };
  const AnimationProductNames = () => {
    const productType = animationProducts[0].type;
    const animationProductNames = animationProducts.map((product) => (
      <div
        className="menuProductName"
        key={product.id}
        id={product.id}
        onClick={() => handleScrollTo(product.id)}>
        {product.name}
      </div>
    ));

    return (
      <>
        <div className="menuProductType">{productType}s</div>
        <div>{animationProductNames}</div>
      </>
    );
  };

  const SmallProductNames = () => {
    const productType = smallProducts[0].type;

    const smallProductsNames = smallProducts.map((product) => (
      <div
        className="menuProductName"
        key={product.id}
        id={product.id}
        onClick={() => handleScrollTo(product.id)}>
        {product.name}
      </div>
    ));
    return (
      <>
        <div className="menuProductType">{productType}s</div>
        <div>{smallProductsNames}</div>
      </>
    );
  };

  const handleMenuToggleByHover = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };
  const handleMenuToggleByClick = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
    setOpenCart(false);
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
      <span className="rotatedMenu">menu</span> {/* SEO friendly */}
    </div>
  );

  const OpenedMenu = () => (
    <div className="openedMenu">
      <AnimationProductNames />
      <SmallProductNames />
      <Auth />
    </div>
  );

  const MenuToggle = () => {
    const isMobile = window.matchMedia("(max-width: 800px)").matches;
    if (isMobile) {
      return !openCart && !openMenu ? (
        <ClosedMenu />
      ) : !openCart && openMenu ? (
        <OpenedMenu />
      ) : null;
    } else {
      return openMenu ? <OpenedMenu /> : <ClosedMenu />;
    }
  };

  return (
    <div
      className="menuWrapper"
      onMouseEnter={handleMenuToggleByHover}
      onMouseLeave={handleMenuToggleByHover}
      onClick={handleMenuToggleByClick}>
      <MenuToggle />
    </div>
  );
};

export default Menu;
