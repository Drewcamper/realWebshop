import React, { useContext, useEffect } from "react";
import "../../style/products/products.css";
import { WebshopContext } from "../../context/context";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(WebshopContext);
 

  useEffect(() => {
    const savedCart = localStorage.getItem("cart") || []; //setCart is async --> [] ensures the state is correctly updated even if there is a delay.
    const updatedCart = savedCart ? JSON.parse(savedCart) : [];
    if (updatedCart) {
      setCart(updatedCart);
    }
  }, []);

  return (
    <div>
      {cart.length ? (
        cart.map((item) => (
          <div key={item.id} className="product-template">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      ) : (
        <div>The cart is empty.</div>
      )}
      cart
      <button
        onClick={() => {
          console.log(cart);
        }}
      >
        check cart
      </button>
      <button>
        <Link to="/" className="cartButton">
          back to products
        </Link>
      </button>
      <button>
        <Link to="/payment" className="cartButton">
          purchase
        </Link>
      </button>
    </div>
  );
}

export default Cart;
