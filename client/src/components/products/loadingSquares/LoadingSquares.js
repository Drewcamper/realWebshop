import React from "react";
import "../../../style/products/loadingSquares.css";
import WordCounter from "./WordCounter";
function LoadingSquares() {
  return (
    <>
      <div className="loadingAnimationWrapper">
        <div className="tileWrapper">
          <div className="backgroundLight L1"></div>
          <div className="backgroundLight L2"></div>
          <div className="backgroundLight L3"></div>
          <div className="backgroundLight L4"></div>
          <div className="backgroundLight L5"></div>
          <div className="line">
            <div className="first tiles firstColumn"></div>
            <div className="second tiles secondColumn"></div>
            <div className="third tiles thirdColumn"></div>
          </div>
          <div className="line">
            <div className="fourth tiles firstColumn"></div>
            <div className="fifth tiles secondColumn"></div>
            <div className="sixth tiles thirdColumn"></div>
          </div>
          <div className="line">
            <div className="seventh tiles firstColumn"></div>
            <div className="eighth tiles secondColumn"></div>
            <div className="nineth tiles thirdColumn"></div>
          </div>
        </div>
      </div>
      <WordCounter />
    </>
  );
}

export default LoadingSquares;
