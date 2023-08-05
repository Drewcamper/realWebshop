import React, { useContext, useEffect, useState } from "react";
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

  // const handleScrollTo = (id) => {
  //   document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  //   console.log(id);
  //   setCurrentWindowLocation(id);
  //   if (id) {
  //     const targetElement = document.getElementById(id);
  //     if (targetElement) {
  //       targetElement.scrollIntoView({ behavior: "smooth" });
  //       setCurrentWindowLocation(null);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   const targetElement = document.getElementById(currentWindowLocation);
  //   if (targetElement) {
  //     // targetElement.window.scrollTo({ behavior: "smooth" });
  //     console.log(`element found`);
  //   } else {
  //     console.log(`haven't found element by id`);
  //     console.log(targetElement);
  //   }
  // }, [currentWindowLocation]);


  const handleScrollTo = (id) => {
    setCurrentWindowLocation(id);
  };
  
  useEffect(() => {
    if (currentWindowLocation) {
      const targetElement = document.getElementById(currentWindowLocation);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        setCurrentWindowLocation(null);
      }
    }
  }, [currentWindowLocation]);
  



  useEffect(() => {
    console.log(currentWindowLocation);
  }, [currentWindowLocation]);

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
        <>{productType}s</>
        <>{animationProductNames}</>
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
        <>{productType}s</>
        <>{smallProductsNames}</>
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
