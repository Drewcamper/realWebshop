import React from "react";
import "../../../style/products/formsAnimation/formsAnimation.css";

const CubeOne = () => {
  return (
    <div className="cubeWrapper cubeWrapper-1">
      <div className="cube">
        <div className="cube-face front">
          <div className="cube-content">
            <button className="cube-text">Menu</button>
          </div>
        </div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
        <div className="cube-face bottom secondBottom"></div>
      </div>
    </div>
  );
};
const CubeTwo = () => {
  return (
    <div className="cubeWrapper cubeWrapper-2">
      <div className="cube">
        <div className="cube-face front">
          <div className="cube-content">
            <button className="cube-text">About</button>
          </div>
        </div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
        <div className="cube-face bottom secondBottom"></div>
      </div>
    </div>
  );
};
const CubeThree = () => {
  return (
    <div className="cubeWrapper cubeWrapper-3">
      <div className="cube">
        <div className="cube-face front">
          <div className="cube-content">
            <button className="cube-text">Contacts</button>
          </div>
        </div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
        <div className="cube-face bottom secondBottom"></div>
      </div>
    </div>
  );
};
const Forms = () => {
  return (
    <div>
      <CubeOne />
      <CubeTwo />
      <CubeThree />
    </div>
  );
};

export default Forms;
