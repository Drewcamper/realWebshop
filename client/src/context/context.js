import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";

export const WebshopContext = createContext();

export const WebshopProvider = ({ children }) => {
  const cookies = new Cookies();

  const [username, setUsername] = useState(cookies.get("username"));
  const [email, setEmail] = useState("");
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [buttonText, setButtonText] = useState("Sign In With Google");
  const [cart, setCart] = useState([]);
  const [priceSum, setPriceSum] = useState(0);
  const [uid, setUid] = useState();

  return (
    <WebshopContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        isAuth,
        setIsAuth,
        buttonText,
        setButtonText,
        cart,
        setCart,
        priceSum,
        setPriceSum,
        uid,
        setUid,
      }}
    >
      {children}
    </WebshopContext.Provider>
  );
};
