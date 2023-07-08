import React, { createContext, useState } from "react";

export const WebshopContext = createContext();

export const WebshopProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("email") || false);
  const [cart, setCart] = useState([]);
  const [priceSum, setPriceSum] = useState(0);
  const [uid, setUid] = useState();

  const [chatWindowVisible, setChatWindowVisible] = useState(false);

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
        chatWindowVisible,
        setChatWindowVisible,
      }}>
      {children}
    </WebshopContext.Provider>
  );
};
