import React, { useContext, useEffect } from "react";
import "../../style/productsPage/products.css";
import { WebshopContext, WebshopProvider } from "../../context/context";

function Cart() {
  const { cart, setCart } = useContext(WebshopContext);
  useEffect(() => {
    if (!cart) {
      console.log("undefined");
    } else {
      console.log(cart);
    }
  }, [cart]);

  return (
    <div>
      {cart.map((cart) => (
        <div key={cart.id} className="product-template">
          <h3>{cart.name}</h3>
          <p>Price: ${cart.price}</p>
        </div>
      ))}
      cart
    </div>
  );
}

export default Cart;
