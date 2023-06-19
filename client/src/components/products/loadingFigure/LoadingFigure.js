import React from "react";
import { Link } from "react-router-dom";
import "../../../style/products/loadingFigure/loadingFigure.css";

function LoadingFigure() {
  return (
    <div className="walkingFigureWrapper">
      <div className="loadingFigureAnimation">
        <div className="body"></div>
        <div className="head"></div>
        <div class="arm left-arm">
          <div class="hand"></div>
        </div>
        <div class="arm right-arm">
          <div class="hand"></div>
        </div>
      </div>
      <Link to="/" className="backButton">
        HOME
      </Link>
    </div>
  );
}

export default LoadingFigure;
