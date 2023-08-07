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
    setCurrentWindowLocation,
  } = useContext(WebshopContext);

  const handleScrollTo = (id) => {
    setCurrentWindowLocation(id);
    console.log({ id: id });
  };
  const AnimationProductNames = () => {
    const productType = animationProducts[0].type;

    return (
      <div
        className="menuProductName"
        onClick={() => {
          const targetElement = document.getElementById(animationProducts[0].id);
          if (targetElement) {
            const offset = -window.innerHeight * 0.4; // 20% of the viewport height
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
        
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth', // Optional: Add smooth scrolling behavior
            });
          }
        }}
        >
        {productType}s
      </div>
    );
  };

  const SmallProductNames = () => {
    const productType = smallProducts[0].type;
    return (
      <div
        className="menuProductName"
        onClick={() => {
          const targetElement = document.getElementById(smallProducts[0].id);
          if (targetElement) {
            const offset = -window.innerHeight * 0.4; // 20% of the viewport height
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
        
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth', // Optional: Add smooth scrolling behavior
            });
          }
        }}
        
        
        >
        {productType}s
      </div>
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
      <div className="menuPorudctNameWrapper">
        <AnimationProductNames />
        <SmallProductNames />
      </div>
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
