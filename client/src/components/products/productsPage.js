// import React, { useState, useEffect, useContext } from "react";
// import "../../style/productsPage/products.css";
// import { WebshopContext } from "../../context/context";
// import { db } from "../../firebase-config";
// import { collection, query, where, onSnapshot } from "firebase/firestore";

// function ProductsPage() {
//   const { cart, setCart } = useContext(WebshopContext);
//   const [products, setProducts] = useState([]);

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

//   useEffect(() => {
//     console.log(cart);
//   }, [cart]);

//   const addToCart = (product, quantity) => {
//     const itemIndex = cart.findIndex((item) => item.id === product.id);
//     if (itemIndex === -1) {
//       setCart([...cart, { ...product, quantity }]);
//     } else {
//       const newCart = [...cart];
//       newCart[itemIndex].quantity += quantity;
//       setCart(newCart);
//     }
//   };

//   const removeFromCart = (product, quantity) => {
//     const itemIndex = cart.findIndex((item) => item.id === product.id);
//     if (itemIndex !== -1) {
//       const newCart = [...cart];
//       newCart[itemIndex].quantity -= quantity;
//       if (newCart[itemIndex].quantity <= 0) {
//         newCart.splice(itemIndex, 1);
//       }
//       setCart(newCart);
//     }
//   };

//   // Render the product template for each product in the array
//   const productTemplates = products.map((product) => (
//     <div key={product.id} className="product-template">
//       <h3>{product.name}</h3>
//       <p>Price: ${product.price}</p>

//       <div className="quantitySetter">
//         <button className="inputButtonMinus" onClick={addToCart}>
//           -
//         </button>
//         <input
//           value={cart[product.id] || 0}
//           onChange={(e) =>
//             setCart((prevCart) => ({
//               ...prevCart,
//               [product.id]: parseInt(e.target.value),
//             }))
//           }
//         />
//         <button className="inputButtonPlus" onClick={removeFromCart}>
//           +
//         </button>
//       </div>
//     </div>
//   ));

//   return (
//     <>
//       <div className="tileWrapper">{productTemplates}</div>
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
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

function ProductsPage() {
  const { cart, setCart } = useContext(WebshopContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), where("shippable", "==", true),orderBy("id", "asc"));
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
  }, []); // You don't need to include `db` as a dependency here.

  useEffect(() => {
    console.log(cart);
  }, [cart]);



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
        <input
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
      <button onClick={() => console.log(products)}>click it</button>
    </>
  );
}

export default ProductsPage;
