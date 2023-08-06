import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { collection, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase-config";
import { WebshopContext } from "../../context/context";
import "../../style/chat/chat.css";
import "../../style/chat/chatSphere.css";

const Sphere = () => {
  const { setChatWindowVisible } = useContext(WebshopContext);
  const [buttonText, setButtonText] = useState("Hey");

  const openChat = useCallback(() => {
    setChatWindowVisible(true);
  }, [setChatWindowVisible]);

  const handleMouseEnter = () => {
    setButtonText("How can I help you?");
  };

  const handleMouseLeave = () => {
    setButtonText("Hey");
  };

  return (
    <div className="miniChatWrapper">
      <button
        className="loadingWrapper"
        onClick={openChat}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {buttonText}
      </button>
    </div>
  );
};

function Chat() {
  const { username, email, chatWindowVisible, setChatWindowVisible, setAlertMessage } =
    useContext(WebshopContext);

  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(true);
  const [messageSent, setMessageSent] = useState(false);
  const messagesContainerRef = useRef(null); // Ref for the chat messages container

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && chatWindowVisible) {
        exitChat();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      setLoading(false);
    });
    return () => unsubscribe();
  }, [messagesQuery]);

  useEffect(() => {
    setMessageSent(false);
    scrollToBottom();
  }, [queriedMessages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Function to send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }
    if (!auth.currentUser) {
      setAlertMessage(
        `Welcome! For private messaging and a personalized experience, please log in in the Menu to chat with us.`
      );
    } else {
      try {
        if (!isOnline) {
          throw new Error("No internet connection");
        }
        // Create a new message document in Firebase Firestore
        await addDoc(messagesRef, {
          text: newMessage,
          createdAt: new Date(),
          username: username,
          recipient: recipient,
          email: email,
        });
        setMessageSent(true);
      } catch (error) {
        // Handle the error
        setAlertMessage(`Failed to send message: ${error.message}`);
        // You can show an error message to the user or perform any other action here
        if (error.message === "No internet connection") {
          setAlertMessage(`Failed to send message. Please check your internet connection.`);
        } else {
          setAlertMessage(`Failed to send message. An unknown error occurred.`);
        }
      }
    }
    setNewMessage("");
  };

  const handleConnectionChange = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    if (!isOnline) {
      setAlertMessage(`You are offline. Please check your internet connection.`)
    } 

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [isOnline]);

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
  const handleEnterKeyPress = (event) => {
    if (event && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event); // Pass the event object to sendMessage
    }
  };
  return (
    <div className="chatWrapper">
      <header>
        <div className="headerText">Customer Service</div>
        <div className="xButton" onClick={exitChat}>
          x
        </div>
      </header>
      <div className="messagesWrapper" ref={messagesContainerRef}>
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="inputWrapper">
        <textarea
          className="inputBox"
          ref={textareaRef}
          value={newMessage}
          onChange={handleTextarea}
          onKeyDown={handleEnterKeyPress}
          placeholder="Type here.."
        />
        <div type="submit" onClick={sendMessage} className="sendButton" disabled={!isOnline}>
          Send
        </div>
      </div>
    </div>
  );
}
const CustomerSupport = () => {
  const { chatWindowVisible } = useContext(WebshopContext);
  return <div className="customerSupportWrapper">{chatWindowVisible ? <Chat /> : <Sphere />}</div>;
};

export default CustomerSupport;
