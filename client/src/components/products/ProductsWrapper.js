import React, { useState, useContext } from "react";
import "../../style/productsPage/products.css";
import { WebshopContext } from "../../context/context";
import { db } from "../../firebase-config";

function ProductsWrapper() {
  const { email, username, setUsername, setEmail, setIsAuth } =
    useContext(WebshopContext);
  const [products, setProducts] = useState();

  useEffect(() => {
    const unsubscribe = db.collection("products").onSnapshot((snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });
    return unsubscribe;
  }, [db]);

  // Render the product template for each product in the array
  const productTemplates = products.map((product) => (
    <div key={product.id} className="product-template">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
    </div>
  ));

  return (
    <>
      <div className="tileWrapper">{productTemplates}</div>;
      <button
        onClick={() => {
          console.log(products);
        }}
      >
        click it
      </button>
    </>
  );
}

export default ProductsWrapper;
