import React, { useState, useContext, useEffect } from "react";
import { WebshopContext } from "../../context/context";
import "../../style/header/alertBox.css";
function AlertBox() {
  const { alertMessage, setAlertMessage } = useContext(WebshopContext);
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    if (alertMessage) {
      setDisplayAlert(true);

      const timeout = setTimeout(() => {
        setDisplayAlert(false);
        setAlertMessage(undefined);
      }, 3500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alertMessage]);

  if (displayAlert && alertMessage !== undefined) {
    return (
      <div className="alertBox">
        <div
          className="alertMessage"
          onClick={() => {
            setAlertMessage(undefined);
          }}>
          {alertMessage}
        </div>
      </div>
    );
  }
  return <></>;
}

export default AlertBox;
