// import React, { useContext, useEffect } from "react";
// import { WebshopContext } from "../../context/context.js";

// import { auth, provider, db } from "../../firebase-config.js";
// import { signInWithPopup, signOut } from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";
// import Cookies from "universal-cookie";

// function Auth() {
//   const {
//     username,
//     setUsername,
//     setEmail,
//     setIsAuth,
//     buttonText,
//     setButtonText,
//     uid,
//     setUid,
//   } = useContext(WebshopContext);

//   const cookies = new Cookies();

//   const signUserOut = async () => {
//     await signOut(auth);
//     cookies.remove("auth-token");
//     cookies.remove("username");
//     localStorage.removeItem("username");
//     setIsAuth(false);
//     setUsername(cookies.get("username"));
//     setEmail(cookies.get("username"));
//   };

//   const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);

//       cookies.set("auth-token", result.user.refreshToken);

//       setEmail(auth.currentUser.email);
//       setUsername(auth.currentUser.displayName);
//       setIsAuth(true);
//       cookies.set("username", auth.currentUser.displayName);
//       cookies.set("email", auth.currentUser.email);
//       localStorage.setItem("username", auth.currentUser.displayName)
//       localStorage.setItem("email", auth.currentUser.email)

//       // No need to call updateUserDocument here
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Function to update or create the user document
//   const updateUserDocument = async (uid, email, username) => {
//     // Create a reference to the user document in Firestore
//     const userRef = doc(db, "users", uid);
//     // Update or create the user document with the email and username fields
//     await setDoc(userRef, { email, username }, { merge: true });
//   };

//   const handleAuth = () => {
//     if (auth.currentUser) {
//       signUserOut();
//     } else {
//       signInWithGoogle();
//     }
//   };
//   useEffect(() => {
//     // Check if the user is authenticated
//     if (auth.currentUser) {
//       // const uid = auth.currentUser.uid;
//       const email = auth.currentUser.email;
//       const username = auth.currentUser.displayName;
//       setUid(auth.currentUser.uid);
//       setEmail(email);
//       setUsername(username);
//       setIsAuth(true);
//       cookies.set("username", username);
//       cookies.set("email", email);

//       localStorage.setItem("username", username);
//       localStorage.setItem("email", email);
//       console.log({ email: email, username: username });
//       updateUserDocument(uid, email, username);
//       setButtonText("Log out");
//     } else {
//       setButtonText("Log in");
//     }
//   }, [username]);

//   return (
//     <div className="auth">
//       <button onClick={handleAuth}>{buttonText}</button>
//     </div>
//   );
// }

// export default Auth;

import React, { useContext, useEffect, useState } from "react";
import { WebshopContext } from "../../context/context.js";

import { auth, provider, db } from "../../firebase-config.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Cookies from "universal-cookie";

function Auth() {
  const { setUsername, setEmail, setIsAuth } = useContext(WebshopContext);

  const cookies = new Cookies();
  const [initialRender, setInitialRender] = useState(true);
  const [buttonText, setButtonText] = useState("Log In");

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    cookies.remove("username");
    cookies.remove("email");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsAuth(false);
    setUsername("");
    setEmail("");
    setButtonText("Log In");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);

      cookies.set("auth-token", auth.currentUser.refreshToken);

      setEmail(auth.currentUser.email);
      setUsername(auth.currentUser.displayName);
      setIsAuth(true);
      setButtonText("Log Out");
      cookies.set("username", auth.currentUser.displayName);
      cookies.set("email", auth.currentUser.email);
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
      updateUserDocument(auth.currentUser.uid, auth.currentUser.email, auth.currentUser.displayName);
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
      <button onClick={handleAuth}>{buttonText}</button>
    </div>
  );
}

export default Auth;
