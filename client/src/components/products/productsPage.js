// import React, { useState, useEffect, useContext } from "react";
// import "../../style/productsPage/products.css";
// import { WebshopContext } from "../../context/context";
// import { db } from "../../firebase-config";
// import { collection, query, where, onSnapshot } from "firebase/firestore";

// function ProductsPage() {
//   const { email, username, setUsername, setEmail, setIsAuth } =
//     useContext(WebshopContext);
//   const [products, setProducts] = useState();

//   // useEffect(() => {
//   //   const unsubscribe = db.collection("products").onSnapshot((snapshot) => {
//   //     const productsData = snapshot.docs.map((doc) => ({
//   //       id: doc.id,
//   //       ...doc.data(),
//   //     }));
//   //     setProducts(productsData);
//   //   });
    
//   //   return unsubscribe;
//   // }, [db]);
//   useEffect(() => {
//     const q = query(collection(db, "products"), where("shippable", "==", true));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const productsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productsData);
//     });
//     return unsubscribe;
//   }, [db]);
//   // Render the product template for each product in the array
//   const productTemplates = products ? products.map((product) => (
//     <div key={product.id} className="product-template">
//       <h3>{product.name}</h3>
//       <p>Price: ${product.price}</p>
//     </div>
//   )) : <div>couldn't load products</div>

//   return (
//     <>
//     {products}
//       <div className="tileWrapper">{productTemplates}</div>;
//       <button
//         onClick={() => {
//           console.log(products);
//         }}
//       >
//         click it
//       </button>
//     </>
//   );
// }

// export default ProductsPage;


import React, { useState, useEffect, useContext } from "react";
import "../../style/productsPage/products.css";
import { WebshopContext } from "../../context/context";
import { db } from "../../firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";


function ProductsPage() {
  const { email, username, setUsername, setEmail, setIsAuth } =
    useContext(WebshopContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), where("shippable", "==", true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
      <div className="tileWrapper">{productTemplates}</div>
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

export default ProductsPage;
