import React, { useContext, useEffect, useState } from "react";
import { WebshopContext } from "../../context/context";
import "../../style/header/menu.css";
import Auth from "./Auth";
const Menu = () => {
  const {
    colorProducts,
    shapeProducts,
    openMenu,
    setOpenMenu,
    openCart,
    setOpenCart,
    setCurrentWindowLocation,
  } = useContext(WebshopContext);

  const handleScrollTo = (id) => {
    setCurrentWindowLocation(id);
  };

  // const ColorProductNames = () => {
  //   const productType = colorProducts[0].type;

  //   return (
  //     <div className="productTypeWrapper">
  //       <div className="responsiveProtector">
  //         <div className="productType">{productType}s</div>
  //         <div className="openProductsButton"></div>{" "}
  //       </div>
  //       <ul className="productList">
  //         {colorProducts.map((product, index) => (
  //           <li
  //             key={index}
  //             onClick={() => {
  //               handleScrollTo(product.id);
  //             }}>
  //             {product.name}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  const ColorProductNames = () => {
    const productType = colorProducts[0].type;
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
      setIsOpen(!isOpen);
    };

    return (
      <div className={`productTypeWrapper ${isOpen ? "open" : ""}`} onClick={toggleOpen}>
        <div className="responsiveProtector" onClick={(e) => e.stopPropagation()}>
          <div className="productType">{productType}s</div>
          <div className={`openProductsButton ${isOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`productList ${isOpen ? "open" : ""}`}>
          {colorProducts.map((product, index) => (
            <li
              key={index}
              onClick={() => {
                handleScrollTo(product.id);
              }}>
              {product.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // const ShapeProductNames = () => {
  //   const productType = shapeProducts[0].type;
  //   return (
  //     <div className="productTypeWrapper">
  //       <div className="responsiveProtector">
  //         <div className="productType">{productType}s</div>{" "}
  //         <div className="openProductsButton"></div>
  //       </div>
  //       <ul className="productList">
  //         {shapeProducts.map((product, index) => (
  //           <li
  //             key={index}
  //             onClick={() => {
  //               handleScrollTo(product.id);
  //             }}>
  //             {product.name}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };





  const ShapeProductNames = () => {
    const productType = shapeProducts[0].type;
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = (e) => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={`productTypeWrapper ${isOpen ? "open" : ""}`} onClick={toggleOpen}>
        <div className="responsiveProtector" onClick={(e) => e.stopPropagation()}>
          <div className="productType">{productType}s</div>{" "}
          <div className={`openProductsButton ${isOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`productList ${isOpen ? "open" : ""}`}>
          {shapeProducts.map((product, index) => (
            <li
              key={index}
              onClick={() => {
                handleScrollTo(product.id);
              }}>
              {product.name}
            </li>
          ))}
        </ul>
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
        <ColorProductNames />
        <ShapeProductNames />
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
