import React from "react";
import "../../style/main/welcome.css";

function Welcome() {
  return (
    <>
      <div className="welcomeWrapper">
        <div className="welcomeTextWrapper">
          <div className="welcomeFlexbox">
            <div className="welcome firstLine">Welcome to my</div>{" "}
          </div>
          <div className="welcome portfolio">portfolio </div>
          <div className="welcome webshop">Webshop!</div>
        </div>
        <div className="welcomeIntruduction">
          Explore a collection that brings my web development journey to life. Dive into dynamic
          user interfaces and interactive applications, each showcasing my dedication to creating
          meaningful experiences.
        </div>
      </div>
    </>
  );
}

export default Welcome;
