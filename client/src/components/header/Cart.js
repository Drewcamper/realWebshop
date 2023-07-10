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

  const ChoosenProducts = () => {
    return (
      <ul>
        {Object.values(cart).map((item, index) => (
          <li key={index}>
            {/* Display the image */}
            <img src={item.image} alt={item.name} />

            {/* Display the item details */}
            <p>Name: {item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <ChoosenProducts />
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
