import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { collection, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase-config";
import { WebshopContext } from "../../context/context";
import "../../style/chat/chat.css";
import "../../style/chat/chatSphere.css";

const Sphere = () => {
  const { setChatWindowVisible } = useContext(WebshopContext);
  const openChat = useCallback(() => {
    setChatWindowVisible(true);
  }, [setChatWindowVisible]);

  return (
    <div className="miniChatWrapper">
      <div className="hoverText">How can I help you?</div>
      <button className="loadingWrapper" onClick={openChat}>
        <div className="container">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

function Chat() {
  const { username, email, setChatWindowVisible } = useContext(WebshopContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [messageSent, setMessageSent] = useState(false);

  const messagesRef = collection(db, "messages");
  const messagesQuery = query(
    messagesRef,
    where("recipient", "==", "Customer Service"),
    where("email", "==", email),
    orderBy("createdAt")
  );
  const [queriedMessages] = useCollectionData(messagesQuery, { idField: "id" });

  const recipient = "Customer Service";
  const textareaRef = useRef(null);

  // Fetch user information from Firebase authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update the local messages state when new messages are received
  useEffect(() => {
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });
    return () => unsubscribe();
  }, [messagesQuery]);
  useEffect(() => {
    setMessageSent(false);
  }, [queriedMessages]);
  // Function to send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }
    if (!auth.currentUser) {
      alert("Please log in to chat with us");
    } else {
      // Create a new message document in Firebase Firestore
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: new Date(),
        username: username,
        recipient: recipient,
        email: email,
      });
    }
    setMessageSent(true);
    setNewMessage("");
  };

  const exitChat = () => {
    setChatWindowVisible(false);
  };
  const handleTextarea = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setNewMessage(e.target.value);
  };
  const showMessage = () => {
    if (messageSent) {
      const message = {
        id: "demo-message",
        text: "This is a demo version. Chat functionality is not available.",
        email: "customer-service@example.com",
        createdAt: new Date().toISOString(),
        recipient: recipient,
        username: "Customer Service",
      };
      return (
        <div className="received-message">
          <p>{message.text}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chatWrapper">
      <header>
        <div className="headerText">Customer Service</div>
        <button className="xButton" onClick={exitChat}>
          X
        </button>
      </header>
      <div className="messagesWrapper">
        {queriedMessages &&
          queriedMessages.map((message, index) => (
            <div
              key={index}
              className={
                message.email === auth.currentUser?.email ? "sent-message" : "received-message"
              }>
              <p>{message.text}</p>
            </div>
          ))}
        <div className="received-message">{showMessage()}</div>
      </div>
      <div className="inputWrapper">
        <div className="inputAndButtonFlex">
          <textarea
            className="inputBox"
            ref={textareaRef}
            value={newMessage}
            onChange={handleTextarea}
          />
          <button type="submit" onClick={sendMessage} className="sendButton">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
const CustomerSupport = () => {
  const { chatWindowVisible } = useContext(WebshopContext);

  if (chatWindowVisible) {
    return <Chat />;
  } else {
    return <Sphere />;
  }
};

export default CustomerSupport;
