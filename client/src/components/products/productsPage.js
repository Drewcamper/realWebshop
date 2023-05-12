import React, { useState, useEffect, useContext } from "react";
import "../../style/productsPage/products.css";
import { WebshopContext } from "../../context/context";
import { db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import _ from "lodash";

function ProductsPage() {
  const { cart, setCart } = useContext(WebshopContext);
  const [products, setProducts] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("shippable", "==", true),
      orderBy("id", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });
    // Only unsubscribe when the component unmounts.
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const savedCart =
      cookies.get("cart") || JSON.parse(localStorage.getItem("cart")) || []; //setCart is async --> [] ensures the state is correctly updated even if there is a delay.
    // const updatedCart = savedCart ? JSON.parse(savedCart) : [];
    if (savedCart !== []) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    console.log(cart);
    if (cart !== 0) {
      // localStorage.setItem("cart", cart);
      localStorage.setItem("cart", JSON.stringify(cart));

      cookies.set("cart", cart);
    }
  }, [cart]);

  const handleClearCart = () => {
    localStorage.setItem("cart", []);
    cookies.set("cart", []);
    setCart([]);
  };
  const addToCart = (product, quantity) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex === -1) {
      setCart([...cart, { ...product, quantity }]);
    } else {
      const newCart = [...cart];
      newCart[itemIndex].quantity += quantity;
      setCart(newCart);
    }
  };

  const removeFromCart = (product, quantity) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity -= quantity;
      if (newCart[itemIndex].quantity <= 0) {
        newCart.splice(itemIndex, 1);
      }
      setCart(newCart);
    }
  };

  // Render the product template for each product in the array
  const productTemplates = products.map((product) => (
    <div key={product.id} className="product-template">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>

      <div className="quantitySetter">
        {/* Pass `product` and `1` to `addToCart`. */}
        <button
          className="inputButtonMinus"
          onClick={() => removeFromCart(product, 1)}
        >
          -
        </button>
        {/* Use `cart.find` instead of `cart[product.id]`. */}
        {/* <input
          value={cart.find((item) => item.id === product.id)?.quantity || 0}
          onChange={(e) =>
            setCart((prevCart) => {
              const newCart = [...prevCart];
              const itemIndex = newCart.findIndex(
                (item) => item.id === product.id
              );
              if (itemIndex !== -1) {
                newCart[itemIndex].quantity = parseInt(e.target.value);
              }
              return newCart;
            })
          }
        /> */}

        <input
          value={
            (cart &&
              Array.isArray(cart) &&
              cart.find((item) => item.id === product.id)?.quantity) ||
            0
          }
          onChange={(e) =>
            setCart((prevCart) => {
              const newCart = [...prevCart];
              const itemIndex = newCart.findIndex(
                (item) => item.id === product.id
              );
              if (itemIndex !== -1) {
                newCart[itemIndex].quantity = parseInt(e.target.value);
              }
              return newCart;
            })
          }
        />

        {/* Pass `product` and `1` to `removeFromCart`. */}
        <button
          className="inputButtonPlus"
          onClick={() => addToCart(product, 1)}
        >
          +
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="tileWrapper">{productTemplates}</div>
      <button onClick={console.log(cookies.get("cart"))}>cookies cart</button>

      <button
        onClick={() => {
          const localStorageCart = JSON.parse(localStorage.getItem("cart"));
          const cookiesCart = cookies.get("cart");
          _.isEqual(localStorageCart, cookiesCart)
            ? console.log(localStorageCart)
            : console.log("localStorage is not the same as the cookies.");
        }}
      >
        localStorage cart
      </button>
      <button
        onClick={() => {
          console.log(cart);
        }}
      >
        {" "}
        cart
      </button>

      <button onClick={handleClearCart}>empty cart</button>
    </>
  );
}

export default ProductsPage;
