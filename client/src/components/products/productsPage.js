import React, { useState, useEffect, useContext } from "react";
import "../../style/products/products.css";
import { WebshopContext } from "../../context/context";
import { db, storage } from "../../firebase-config";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import _ from "lodash";
import sphereProduct from "../../assets/products/sphere.png";
import { Link } from "react-router-dom";

function ProductsPage() {
  const { cart, setCart, setPriceSum } = useContext(WebshopContext);
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "productImages/");
  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };
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

  // useEffect(() => {
  //   console.log(cart);
  //   const sum = cart.reduce((acc, item) => {
  //     const itemPrice = typeof item.price === "number" ? item.price : 0;
  //     const itemQuantity = typeof item.quantity === "number" ? item.quantity : 0;
  //     return acc + itemPrice * itemQuantity;
  //   }, 0);
  //   console.log("Cart sum:", sum);
  //   setPriceSum(sum);
  //   if (cart.length !== 0) {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }
  // }, [cart]);

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

  const productTemplates = products.map((product, index) => {
    const imageUrl = imageUrls[index]; // Access image URL based on the index

    return (
      <div key={product.id} className="product-template">
        <h3>{product.name}</h3>
        <Link to="/formsAnimation" className="reactRouterLinks">
          {imageUrl && <img src={imageUrl} alt="loading sphere" />}
        </Link>
        <div>{product.description}</div>
        <p>Price: ${product.price}</p>
        <button onClick={() => addToCart(product, 1)} disabled={isProductInCart(product)}>
          {isProductInCart(product) ? "Added to cart" : "Add to cart"}
        </button>
        <button onClick={() => removeFromCart(product, 1)}>remove from cart</button>
      </div>
    );
  });

  return (
    <>
      {/* <Link to="/">webshop</Link> */}
      {/* <div className="secondCurve"></div> */}

      <div className="productsFlexBox">
        {/* <LoadingSphereMain />
        <CubeMenu />
        <ConnectionAnimation />
        <SquareAnimation /> */}
      </div>

      <div className="productsTileWrapper">{productTemplates}</div>
      <button onClick={handleClearCart}>empty cart</button>
    </>
  );
}

const LoadingSphereMain = () => {
  return (
    <div className="productTiles">
      <Link to="/loadingSphere" className="reactRouterLinks">
        <img src={sphereProduct} alt="loading sphere"></img>
      </Link>
      <div className="productDescription">
        The Earth Sphere animation is a representation of our planet, its atmosphere, and the
        satellites orbiting around it. Immerse your users in a visually stunning experience as they
        witness the beauty and grandeur of Earth.
      </div>
    </div>
  );
};
const CubeMenu = () => {
  return (
    <div className="productTiles">
      <Link to="/formsAnimation" className="reactRouterLinks">
        <img src={sphereProduct} alt="square menu"></img>
      </Link>
      <div className="productDescription">
        Introducing our dynamic Cube Menu animation, a sleek and interactive way to navigate your
        website. Engage your visitors with a modern and playful user experience, making navigation a
        visually captivating journey.
      </div>
    </div>
  );
};
const ConnectionAnimation = () => {
  return (
    <div className="productTiles">
      <Link to="/connectionAnimation" className="reactRouterLinks">
        <img src={sphereProduct} alt="connection animation"></img>
      </Link>
      <div className="productDescription">
        An efficient Data Retrieval animation, designed to add a touch of sophistication to your
        loading screens. This simple yet elegant animation symbolizes the process of retrieving and
        connecting data, keeping your users engaged while they await content. Enhance the user
        experience on your web projects with this seamless loading animation.
      </div>
    </div>
  );
};
const SquareAnimation = () => {
  return (
    <div className="productTiles">
      <Link to="/loadingSquare" className="reactRouterLinks">
        <img src={sphereProduct} alt="loading squares"></img>
      </Link>{" "}
      <div className="cartWrapper">
        <div className="productDescription">
          Progress Square animation, a delightful way to showcase the progress of your tasks or
          loading processes smoothly transitions from 0% to 100% to indicate progress. Whether it's
          for loading content or indicating task completion, this charming animation adds a touch of
          visual appeal to your web projects.
        </div>
        <button className="addToCartButton">add to cart</button>
      </div>{" "}
    </div>
  );
};

export default ProductsPage;
