import React, { useState, useEffect, useContext } from "react";
import "../../style/products/products.css";
import { WebshopContext } from "../../context/context";
import { db } from "../../firebase-config";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import _ from "lodash";
import sphereProduct from "../../assets/products/sphere.png";
import { Link } from "react-router-dom";

function ProductsPage() {
  const { cart, setCart, setPriceSum } = useContext(WebshopContext);
  const [products, setProducts] = useState([]);

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
  }, []); //get the shippable products

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []; //setCart is async --> [] ensures the state is correctly updated even if there is a delay.
    if (savedCart !== []) {
      setCart(savedCart);
    }
  }, []); //if there are products in the cart, loads from local storage

  useEffect(() => {
    console.log(cart);
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("Cart sum:", sum);
    setPriceSum(sum);
    if (cart !== 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]); //updates the cart when there is change

  const handleClearCart = () => {
    localStorage.setItem("cart", []);
    setCart([]);
  }; //clears the cart

  const addToCart = (product, quantity) => {
    let sum = 0;
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex === -1) {
      setCart([...cart, { ...product, quantity }]);
    } else {
      const newCart = [...cart];
      newCart[itemIndex].quantity += quantity;
      setCart(newCart);
    }
  }; //adds one item to the cart

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
  }; //removes one item from the cart.

  // Render the product template for each product in the array
  const productTemplates = products.map((product) => (
    <div key={product.id} className="product-template">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>

      <div className="quantitySetter">
        {/* Pass `product` and `1` to `addToCart`. */}
        <button className="inputButtonMinus" onClick={() => removeFromCart(product, 1)}>
          -
        </button>
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
              const itemIndex = newCart.findIndex((item) => item.id === product.id);
              if (itemIndex !== -1) {
                newCart[itemIndex].quantity = parseInt(e.target.value);
              }
              return newCart;
            })
          }
        />
        <button className="inputButtonPlus" onClick={() => addToCart(product, 1)}>
          +
        </button>
      </div>
    </div>
  ));

  return (
    <>
      {/* <Link to="/">webshop</Link> */}
      <div className="secondCurve"></div>

      <div className="productsFlexBox">
        products
        <Link to="/loadingSphere">
          <img src={sphereProduct} alt="loading sphere"></img>
        </Link>
        <Link to="/formsAnimation">
          <img src={sphereProduct} alt="square menu"></img>
        </Link>
        <Link to="/connectionAnimation">
          <img src={sphereProduct} alt="connection animation"></img>
        </Link>
        <Link to="/loadingSquare">
          <img src={sphereProduct} alt="loading squares"></img>
        </Link>
      </div>

      {/* <div className="productsTileWrapper">{productTem§plates}</div> */}
      <button onClick={handleClearCart}>empty cart</button>
    </>
  );
}

export default ProductsPage;
