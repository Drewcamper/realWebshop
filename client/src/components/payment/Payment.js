import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutFrom";
import React, { useContext } from "react";
import { WebshopContext } from "../../context/context";
import { db } from "../../firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../../style/payment/payment.css";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const { cart } = useContext(WebshopContext);

  useEffect(() => {
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const localSum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const cartProductNames = cartItemsFromLocalStorage.map((item) => item.name);
    const q = query(collection(db, "products"), where("name", "in", cartProductNames));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let sum = 0;
      snapshot.forEach((doc) => {
        const product = doc.data();
        const cartItem = cartItemsFromLocalStorage.find((item) => item.name === product.name);
        if (cartItem) {
          sum += product.price * cartItem.quantity;
        }
      });

      if (sum === localSum) {
        setTotalAmount(sum);
      } else {
        setTotalAmount(sum);
        setErrorMessage("The price has been changed in the meantime.");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount: totalAmount }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />

          <Link to="/" className="backToHome">
            HOME
          </Link>
        </Elements>
      )}
    </div>
  );
}

export default Payment;
