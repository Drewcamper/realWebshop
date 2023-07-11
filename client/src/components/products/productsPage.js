import React, { useState, useEffect, useContext } from "react";
import "../../style/products/products.css";
import { WebshopContext } from "../../context/context";
import { db, storage } from "../../firebase-config";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import _ from "lodash";
import { Link } from "react-router-dom";

function ProductsPage() {
  const { cart, setCart, setPriceSum } = useContext(WebshopContext);
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "productImages/");

  useEffect(() => {
    const fetchImageUrls = async () => {
      const response = await listAll(imagesListRef);
      const urls = await Promise.all(response.items.map((item) => getDownloadURL(item)));
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, []);

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

  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const handleClearCart = () => {
    localStorage.setItem("cart", []);
    setCart([]);
  }; //clears the cart

  const addToCart = (product, quantity) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex === -1 && quantity > 0) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity = Math.max(quantity, 1);
      setCart(newCart);
    }
  };

  const removeFromCart = (product, quantity) => {
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

  const handleCartToggle = (product) => {
    if (isProductInCart(product)) {
      removeFromCart(product, 1);
    } else {
      addToCart(product, 1);
    }
  };

  const productTemplates = products.map((product, index) => {
    const imageUrl = imageUrls[index]; // Access image URL based on the index
    return (
      <div key={product.id} className="product-template">
        <Link to={product.link} className="reactRouterLinks">
          <div className="productName">{product.name}</div>

          {imageUrl && <img src={imageUrl} alt={product.name} />}
        </Link>
        <div className="productDescriptionAndPriceAndButton">
          <div className="productDescription">{product.description}</div>

          <div>
            <div className="productPrice">Price: ${product.price}</div>
            <button
              className={`cartHandleButton ${
                isProductInCart(product) ? "removeFromCart" : "addToCart"
              }`}
              onClick={() => handleCartToggle(product)}>
              {isProductInCart(product) ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* <Link to="/">webshop</Link> */}
      {/* <div className="secondCurve"></div> */}

      <div className="productsTileWrapper">{productTemplates}</div>
      <button onClick={handleClearCart}>empty cart</button>
    </>
  );
}

export default ProductsPage;
