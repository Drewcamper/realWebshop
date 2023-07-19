import React, { useContext,  useEffect } from "react";
import "../../style/header/cart.css";
import { WebshopContext } from "../../context/context";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, setCart, priceSum, openCart, setOpenCart, openMenu, setOpenMenu } =
    useContext(WebshopContext);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart") || []; //setCart is async --> [] ensures the state is correctly updated even if there is a delay.
    const updatedCart = savedCart ? JSON.parse(savedCart) : [];
    if (updatedCart) {
      setCart(updatedCart);
    }
  }, []);

  useEffect(() => {
    console.log({ openmenu: openMenu, opencart: openCart });
  }, [openMenu, openCart]);

  const ProductsInCart = cart.map((product) => {
    return <div className="menuProductName">{product.name}</div>;
  });

  const ChoosenProducts = () => {
    return (
      <div className="openedCart">
        {priceSum === 0 ? (
          <div className="emptyCartText">The cart is empty. You haven't chosen any product.</div>
        ) : (
          <div className="choosenProducts">
            {Object.values(cart).map((item, index) => (
              <div key={index}>
                <p>Name: {item.name}</p>
                <p>Price: ${item.price}</p>
              </div>
            ))}
            {/* <ProductsInCart /> */}
            {priceSum}
            <Link to="/payment">purchase</Link>
          </div>
        )}
      </div>
    );
  };
  const handleCartToggleByHover = () => {
    setOpenCart((prevOpenCart) => !prevOpenCart);
  };
  const handleCartToggleByClick = () => {
    openCart ? setOpenCart(false) : setOpenCart(true);
    if (openCart && openMenu) {
      setOpenMenu(false);
      setOpenCart(true);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && openCart) {
        setOpenCart(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const OpenedCart = () => {
    return <ChoosenProducts />;
  };
  const ClosedCart = () => {
    return (
      <div className="closedCart">
        <div className="rotatedCart">cart</div>
      </div>
    );
  };

  const CartToggle = () => {
    return window.screen.width < 800 ? (
      !openCart && !openMenu ? (
        <ClosedCart />
      ) : openCart && !openMenu ? (
        <OpenedCart />
      ) : openMenu ? (
        <></>
      ) : null
    ) : openCart ? (
      <OpenedCart />
    ) : (
      <ClosedCart />
    );
  };

  return (
    <div
      className="cartWrapper"
      onMouseEnter={handleCartToggleByHover}
      onMouseLeave={handleCartToggleByHover}
      onClick={handleCartToggleByClick}>
      <CartToggle />
    </div>
  );
}

export default Cart;
