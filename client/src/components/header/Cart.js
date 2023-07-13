import React, { useContext, useState, useEffect } from "react";
import "../../style/header/cart.css";
import { WebshopContext } from "../../context/context";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, setCart, priceSum } = useContext(WebshopContext);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart") || []; //setCart is async --> [] ensures the state is correctly updated even if there is a delay.
    const updatedCart = savedCart ? JSON.parse(savedCart) : [];
    if (updatedCart) {
      setCart(updatedCart);
    }
  }, []);
  const ChoosenProducts = () => {
    return (
      <div className="openedCart">
        {priceSum === 0 ? (
          <div className="emptyCartText">The cart is empty. You haven't choosed any product.</div>
        ) : (
          <div className="choosenProducts">
            <ul>
              {Object.values(cart).map((item, index) => (
                <li key={index}>
                  <p>Name: {item.name}</p>
                  <p>Price: ${item.price}</p>
                </li>
              ))}
            </ul>
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
  };
  return (
    <div
      className="cartWrapper"
      onMouseEnter={handleCartToggleByHover}
      onMouseLeave={handleCartToggleByHover}
      onClick={handleCartToggleByClick}>
      {!openCart ? (
        <div className="closedCart">
          {/* {priceSum !== 0 && <div className="cartSum">{priceSum} $</div>} */}
          <div className="rotatedCart">cart</div>
        </div>
      ) : (
        <>
          <ChoosenProducts />
        </>
      )}
    </div>
  );
}

export default Cart;
