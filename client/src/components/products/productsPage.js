import React, { useState, useEffect, useContext } from "react";
import "../../style/products/products.css";
import { WebshopContext } from "../../context/context";
import { db, storage } from "../../firebase-config";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import _ from "lodash";
function ProductsPage() {
  const {
    cart,
    setCart,
    setPriceSum,
    colorProducts,
    setColorProducts,
    shapeProducts,
    setShapeProducts,
    setAlertMessage,
    currentWindowLocation,
  } = useContext(WebshopContext);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "productImages/");

  useEffect(() => {
    const fetchImageUrls = async () => {
      const response = await listAll(imagesListRef);
      const urls = await Promise.all(response.items.map((item) => getDownloadURL(item)));
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, []); //load images

  useEffect(() => {
    console.log({ colorProducts: colorProducts, shapeProducts: shapeProducts });
  }, [colorProducts, shapeProducts]);

  useEffect(() => {
    const fetchProducts = async (productType, setProducts) => {
      const q = query(
        collection(db, "products"),
        where("shippable", "==", true),
        where("type", "==", productType),
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
    };

    fetchProducts("color", setColorProducts);
    fetchProducts("shape", setShapeProducts);
  }, []); // Fetch both color and shape products

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []; //setCart is async --> [] ensures the state is correctly updated even if there is a delay.
    if (savedCart !== []) {
      setCart(savedCart);
    }
  }, []); //if there are products in the cart, loads from local storage

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setPriceSum(sum);
    if (cart !== 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]); //updates the cart when there is change

  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

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
      setAlertMessage("Item removed from your cart");
    } else {
      addToCart(product, 1);
      setAlertMessage("Item added to your cart");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (currentWindowLocation) {
      const targetElement = document.getElementById(currentWindowLocation);
      if (targetElement) {
        const viewportHeight = window.innerHeight;
        const offset = -viewportHeight * 0.15;

        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset + offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentWindowLocation]);

  const ColorProducts = () => {
    const [productType, setProductType] = useState("");

    useEffect(() => {
      if (colorProducts.length > 0 && productType === "") {
        setProductType(colorProducts[0].type);
      }
    }, [colorProducts, productType]);

    const colorProductTemplates = colorProducts.map((product, index) => {
      return (
        <div key={product.id} className="product-template" id={product.id}>
          <div className="productAligner">
            <div className="productName smallScreenVisible">{product.name}</div>
            <div className="reactRouterLinks">
              <div className="lightWrapper">
                <div
                  className="backgroundLight"
                  style={{
                    boxShadow: product.boxShadow,
                    // backgroundColor: product.backgroundColor,
                  }}></div>
              </div>
            </div>
            <div className="productDescriptionAndPriceAndButton">
              <div className="productName  bigScreenVisible">{product.name}</div>
              <div className="productDescription">{product.description}</div>
              <div className="productPriceAndButton">
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
        </div>
      );
    });
    return (
      <>
        <div className="productsTileWrapper">{colorProductTemplates}</div>
      </>
    );
  };

  const ShapeProducts = () => {
    const [productType, setProductType] = useState("");
    useEffect(() => {
      if (shapeProducts.length > 0 && productType === "") {
        setProductType(shapeProducts[0].type);
      }
    }, [shapeProducts, productType]);
    const shapeProductTemplates = shapeProducts.map((product, index) => {
      const imageUrl = imageUrls[index + 4]; // Access image URL based on the index

      return (
        <div key={product.id} className="product-template" id={product.id}>
          <div className="productAligner">
            <div className="productName smallScreenVisible">{product.name}</div>
            <div className="reactRouterLinks">
              {imageUrl && <img src={imageUrl} alt={product.name} className="productImage" />}
            </div>
            <div className="productDescriptionAndPriceAndButton">
              <div className="productName bigScreenVisible">{product.name}</div>
              <div className="productDescription">{product.description}</div>
              <div className="productPriceAndButton">
                <div className="productPrice">Price: ${product.price}</div>
                <button
                  className={`cartHandleButton ${
                    isProductInCart(product) ? "removeFromCart" : "addToCart"
                  }`}
                  onClick={() => handleCartToggle(product)}>
                  {isProductInCart(product) ? "Remove from cart" : "Add to cart"}
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="productsTileWrapper">{shapeProductTemplates}</div>
      </>
    );
  };

  return (
    <>
      <div className="toTop" onClick={scrollToTop}>
        ⇪<div className="toTopText">to the top</div>
      </div>
      <ColorProducts />
      <ShapeProducts />
    </>
  );
}

export default ProductsPage;
