import React from "react";
import '../../style/main/welcome.css'

function Welcome() {
  return (
    <div className="welcomeWrapper">
      <div className="welcome">Welcome to my portfolio Webshop!</div>
      <div className="welcomeIntruduction">
        Discover a stunning collection of meticulously crafted CSS animations that will breathe life
        into your web projects. Elevate your websites with seamless motion and mesmerizing effects,
        creating extraordinary user experiences.
      </div>
      {/* <div className="curve"></div> */}
    </div>
  );
}

export default Welcome;
