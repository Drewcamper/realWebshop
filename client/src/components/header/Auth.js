import React, { useContext, useEffect, useState } from "react";
import { WebshopContext } from "../../context/context.js";
import "../../style/auth/auth.css";
import { auth, provider, db } from "../../firebase-config.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

function Auth() {
  const { setUsername, setEmail, setIsAuth, setAlertMessage } =
    useContext(WebshopContext);

  const [buttonText, setButtonText] = useState("Log In");

  const signUserOut = async () => {
    await signOut(auth);

    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsAuth(false);
    setUsername("");
    setEmail("");
    setButtonText("Log In");
    setAlertMessage('You succesfully logged out')
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);

      setEmail(auth.currentUser.email);
      setUsername(auth.currentUser.displayName);
      setIsAuth(true);
      setButtonText("Log Out");
      localStorage.setItem("username", auth.currentUser.displayName);
      localStorage.setItem("email", auth.currentUser.email);
      setAlertMessage('You succesfully logged in')

    } catch (err) {
      setAlertMessage(err)
    }
  };


  const updateUserDocument = async (uid, email, username) => {
    if (!uid || !email || !username) {
      return;
    }
    const userRef = doc(db, "users", uid);

    try {
      await setDoc(userRef, { email, username }, { merge: true });
    } catch (error) {
      setAlertMessage(`Error updating user document: ${error}`)
    }
  };

  const handleAuth = () => {
    if (auth.currentUser) {
      signUserOut();
    } else {
      signInWithGoogle();
    }
  };
  const openUserMenu = (event) => {
    event.stopPropagation();
  };
  const UserPhoto = () => {
    if (auth.currentUser) {
      return (
        <>
          <div className="profileWrapper" onClick={openUserMenu}>
            <img
              src={auth.currentUser.photoURL}
              // referrerpolicy="no-referrer"
              className="profilePhoto"></img>
            <div className="profileName">{auth.currentUser.displayName}</div>
          </div>
        </>
      );
    }
    return <></>;
  };
  useEffect(() => {
    if (auth.currentUser) {
      updateUserDocument(
        auth.currentUser.uid,
        auth.currentUser.email,
        auth.currentUser.displayName
      );
      setButtonText("Log Out");
    } else {
      setButtonText("Log In");
    }
  }, [auth.currentUser]);
  return (
    <div className="auth">
      <UserPhoto />
      <div onClick={handleAuth} className="authButton">
        {buttonText}
      </div>
    </div>
  );
}

export default Auth;
