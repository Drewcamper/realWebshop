import React from "react";
import "../../../style/products/formsAnimation/formsAnimation.css";
import { Link } from "react-router-dom";

const CubeOne = () => {
  return (
    <div className="cubeWrapper">
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
const CubeTwo = () => {
  return (
    <div className="cubeWrapper">
      <div className="cube">
        <div className="cube-face front">
          <div className="cube-content">
            <button className="cube-text">Products</button>
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
    <div className="cubeWrapper">
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
      <Link to="/" className="backToHome">
        HOME
      </Link>
    </div>
  );
};

export default Forms;
