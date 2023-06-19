import React from "react";
import "../../../style/products/loadingCircles/loadingCircles.css";

function LoadingCircles() {
  return (
    <div>
      <div className="loadingCirclesWrapper">
        <div className="rings outer"></div>
        <div className="rings semiOuter"></div>
        <div className="rings middle">
          <div className="circle"></div>
          </div>
        <div className="rings semiInner"></div>
        <div className="rings inner"></div>
      </div>
    </div>
  );
}

export default LoadingCircles;
