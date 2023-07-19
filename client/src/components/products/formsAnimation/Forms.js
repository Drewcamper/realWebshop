import React from "react";
import "../../../style/products/formsAnimation/formsAnimation.css";
import { Link, useNavigate } from "react-router-dom";

const CubeOne = () => {
  return (
    <div className="cubeWrapper">
      <div className="cube">
        <div className="cube-face front">
          <div className="cube-content">
            <button className="cube-text">PLAY</button>
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
            <button className="cube-text">LEVELS</button>
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
            <button className="cube-text">SETTINGS</button>
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
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className="prevPage">
      <div className="threeCubes">
        <CubeOne />
        <CubeTwo />
        <CubeThree />
      </div>

      <Link to="/" className="backToHome">
        HOME
      </Link>
    </div>
  );
};

export default Forms;
