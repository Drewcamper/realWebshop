import React, { useContext, useEffect } from "react";
import "../../style/header/cart.css";
import { WebshopContext } from "../../context/context";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, setCart, priceSum, setPriceSum, openCart, setOpenCart, openMenu, setOpenMenu } =
    useContext(WebshopContext);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart") || []; //setCart is async --> [] ensures the state is correctly updated even if there is a delay.
    const updatedCart = savedCart ? JSON.parse(savedCart) : [];
    if (updatedCart) {
      setCart(updatedCart);
    }
  }, []);

  const removeFromCart = (event, product, quantity) => {
    event.stopPropagation();
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1 && quantity > 0) {
      const newCart = [...cart];
      newCart[itemIndex].quantity = Math.max(newCart[itemIndex].quantity - quantity, 0);
      if (newCart[itemIndex].quantity === 0) {
        newCart.splice(itemIndex, 1);
      }
      setCart(newCart);
    }
  };
  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setPriceSum(sum);
    if (cart !== 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]); //updates the cart when there is change
  const ChoosenProducts = () => {
    const handleScrollTo = (id) => {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    };
    return (
      <div>
        {priceSum === 0 ? (
          <div className="emptyCartText">The cart is empty. You haven't chosen any product.</div>
        ) : (
          <div className="choosenProducts">
            {cart.map((item, index) => (
              <div
                key={index}
                className="productWrapper"
                id={item.id}
                onClick={() => handleScrollTo(item.id)}>
                <div className="itemAndPrice">
                  <p>{item.name}</p>
                  <p className="price">${item.price}</p>
                </div>
                <div className="deleteProduct" onClick={(event) => removeFromCart(event, item, 1)}>
                  x
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  const handleCartToggleByHover = () => {
    setOpenCart((prevOpenCart) => !prevOpenCart);
  };
  const handleCartToggleByClick = () => {
    setOpenCart((prevOpenCart) => !prevOpenCart);
    setOpenMenu(false);
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
    const isMobile = window.innerWidth < 800;

    return (
      <div className="openedCart">
        <ChoosenProducts />
        <div className="sum">total: ${priceSum}</div>
        <div className="purchaseWrapper">
          <Link to="/payment" className="purchaseLink">
            Purchase
          </Link>
        </div>
      </div>
    );
  };
  const ClosedCart = () => {
    return (
      <div className="closedCart">
        <div className="rotatedCart">cart</div>
      </div>
    );
  };

  const CartToggle = () => {
    const isMobile = window.matchMedia("(max-width: 800px)").matches;
    if (isMobile) {
      return !openCart && !openMenu ? (
        <ClosedCart />
      ) : openCart && !openMenu ? (
        <OpenedCart />
      ) : null;
    } else {
      return openCart ? <OpenedCart /> : <ClosedCart />;
    }
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
