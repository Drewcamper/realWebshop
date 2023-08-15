import React from "react";
import "../../../style/products/loadingSquares/loadingSquares.css";

function LoadingSphere() {
  return (
    <div className="lightWrapper">
      <div className="backgroundLight L1"></div>
      <div className="backgroundLight L2"></div>
      <div className="backgroundLight L3"></div>
      <div className="backgroundLight L4"></div>
      <div className="backgroundLight L5"></div>
    </div>
  );
}

export default LoadingSphere;
