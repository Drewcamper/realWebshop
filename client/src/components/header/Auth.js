import React, { useContext, useEffect, useState } from "react";
import { WebshopContext } from "../../context/context.js";
import '../../style/auth/auth.css'
import { auth, provider, db } from "../../firebase-config.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

function Auth() {
  const { setUsername, setEmail, setIsAuth, email, username } = useContext(WebshopContext);

  const [initialRender, setInitialRender] = useState(true);
  const [buttonText, setButtonText] = useState("");

  const signUserOut = async () => {
    await signOut(auth);

    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsAuth(false);
    setUsername("");
    setEmail("");
    setButtonText("Log In");
  };

  const signInWithGoogle = async () => {
    try {
      // await signInWithRedirect(auth, provider);
      await signInWithPopup(auth, provider);

      setEmail(auth.currentUser.email);
      setUsername(auth.currentUser.displayName);
      setIsAuth(true);
      setButtonText("Log Out");
      localStorage.setItem("username", auth.currentUser.displayName);
      localStorage.setItem("email", auth.currentUser.email);
    } catch (err) {
      console.log(err);
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
      console.log("Error updating user document:", error);
    }
  };

  const handleAuth = () => {
    if (auth.currentUser) {
      signUserOut();
    } else {
      signInWithGoogle();
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      updateUserDocument(
        auth.currentUser.uid,
        auth.currentUser.email,
        auth.currentUser.displayName
      );
      setButtonText("log out");
    } else {
      setButtonText("log in");
    }
  }, [auth.currentUser]);

  useEffect(() => {
    // Retrieve the buttonText from local storage
    const storedButtonText = localStorage.getItem("buttonText");
    // If the buttonText exists in local storage, set it as the initial state
    if (storedButtonText) {
      setButtonText(storedButtonText);
    }
  }, []);

  useEffect(() => {
    // Update the buttonText state in local storage whenever it changes
    localStorage.setItem("buttonText", buttonText);
  }, [buttonText]);

  return (
    <div className="auth">
      <div onClick={handleAuth} className="authButton">
        {buttonText}
      </div>
    </div>
  );
}

export default Auth;
