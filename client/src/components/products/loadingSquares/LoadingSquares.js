import React, { useState, useEffect } from "react";
import "../../../style/products/loadingSquares/loadingSquares.css";
import { Link } from "react-router-dom";

const ProgressBar = () => {
  return (
    <div className="loaderWrapper">
      <div className="loader"></div>
    </div>
  );
};

const PercentageCalculator = ({ onCountUpdate }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      onCountUpdate((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(timer);
          return prevCount;
        }
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [onCountUpdate]);

  return null;
};

function LoadingSphere() {
  const [count, setCount] = useState(0);

  const handleCountUpdate = (newCount) => {
    setCount(newCount);
  };

  const tileWrapperStyle = {
    width: "300px",
    height: "300px",
    margin: "1px",
    padding: "80px",
    transition: "1s",
    overflow: "hidden",
    position: "relative",
    borderRadius: "30%",
    boxShadow: count === 100 ? "0px 0px 10px 3px rgb(105, 157, 105)" : "0px 0px 10px 1px white",
  };

  return (
    <>
      <div className="loadingAnimationWrapper">
        <ProgressBar />
        <div className="tileWrapper" style={tileWrapperStyle}>
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
          <PercentageCalculator onCountUpdate={handleCountUpdate} />
          <div className="percentageNumber">{count}%</div>
        </div>
      </div>
      <Link to="/" className="backToHome">
        HOME
      </Link>
    </>
  );
}

export default LoadingSphere;
