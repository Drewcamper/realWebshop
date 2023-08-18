import React from "react";
import "../../style/main/welcome.css";

function Welcome() {
  return (
    <>
      <div className="welcomeWrapper">
        <div className="welcomeTextWrapper">
          <div className="welcomeFlexbox">
            <div className="welcome">Welcome to my webshop</div>
          </div>
        </div>
        <div className="welcomeIntruduction">
        Explore a collection of shapes and colors that serve as fictive products.
        </div>
      </div>
    </>
  );
}

export default Welcome;
