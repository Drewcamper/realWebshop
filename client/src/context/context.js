import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";

export const WebshopContext = createContext();

export const WebshopProvider = ({ children }) => {
  const cookies = new Cookies();

  const [username, setUsername] = useState(
    cookies.get("username") || localStorage.getItem("username") || ''
  );
  const [email, setEmail] = useState(cookies.get("email") || localStorage.getItem("email") || "");
  const [isAuth, setIsAuth] = useState(
    cookies.get("auth-token") || localStorage.getItem("email") || false
  );
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
        cart,
        setCart,
        priceSum,
        setPriceSum,
        uid,
        setUid,
      }}>
      {children}
    </WebshopContext.Provider>
  );
};
