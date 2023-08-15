import React, { createContext, useState } from "react";

export const WebshopContext = createContext();

export const WebshopProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("email") || false);
  const [cart, setCart] = useState([]);
  const [priceSum, setPriceSum] = useState(0);
  const [uid, setUid] = useState();
  const [colorProducts, setColorProducts] = useState([]);
  const [shapeProducts, setShapeProducts] = useState([]);

  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const [chatWindowVisible, setChatWindowVisible] = useState(false);
  const [currentWindowLocation, setCurrentWindowLocation] = useState(null);
  const [alertMessage, setAlertMessage] = useState(undefined);
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
        colorProducts,
        setColorProducts,
        shapeProducts,
        setShapeProducts,
        openMenu,
        setOpenMenu,
        openCart,
        setOpenCart,
        profileIsOpen,
        setProfileIsOpen,
        currentWindowLocation,
        setCurrentWindowLocation,
        alertMessage,
        setAlertMessage,
      }}>
      {children}
    </WebshopContext.Provider>
  );
};
