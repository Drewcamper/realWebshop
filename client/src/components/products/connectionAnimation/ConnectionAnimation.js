import React, { useState, useEffect } from "react";
import "../../../style/products/connectionAnimation/connectionAnimation.css";
import { Link } from "react-router-dom";

const ConnectionAnimation = () => {
  const [count, setCount] = useState(0);
  const [loadingRepetitions, setLoadingRepetitions] = useState(1);
  const [waitingTime, setWaitingTime] = useState(7);
  const [loadingText, setLoadingText] = useState("authentication");
  const timeRandomizer = 75;

  useEffect(() => {
    if (count === 100 && loadingRepetitions < 5) {
      const newText =
        loadingRepetitions === 1
          ? "checking updateds"
          : loadingRepetitions === 2
          ? "retrieving data 1/2"
          : loadingRepetitions === 3
          ? "retrieving data 2/2"
          : "finalisation";

      setLoadingText(newText);
      setCount(0);
      setWaitingTime(Math.random() * timeRandomizer);
      handleCountUpdate(0);
      setLoadingRepetitions(loadingRepetitions + 1);
    }
    if (count === 100 && loadingRepetitions === 5) {
      setLoadingText("done");
    }
  }, [count, loadingRepetitions]);

  const handleCountUpdate = (newCount) => {
    setCount(newCount);
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
      }, waitingTime);

      return () => {
        clearInterval(timer);
      };
    }, [onCountUpdate]);

    return (
      <div className="loadingScreen">
        <div className="loadingText">{loadingText}</div>
        <div className="loadingPercentage">{count}%</div>
      </div>
    );
  };
  const bubbleContainerClassName =
    loadingRepetitions === 5 && count === 100 ? "finishedBubbleContainer" : "bubbleContainer";

  const stationeryClassName =
    loadingRepetitions === 5 && count === 100 ? "finishedStatinoery" : "statinoery";
  const wobbleClassName = loadingRepetitions === 5 && count === 100 ? "finishedWobble" : "wobble";
  const bubbleClassName = loadingRepetitions === 5 && count === 100 ? "finishedBubble" : "bubble";
  const oneClassName = loadingRepetitions === 5 && count === 100 ? "finishedBubble" : "bubble one";
  const twoClassName = loadingRepetitions === 5 && count === 100 ? "finishedBubble" : "bubble two";

  return (
    <>
      <div className={bubbleContainerClassName}>
        <div className={stationeryClassName}></div>
        <div className={wobbleClassName}></div>
        <div className={bubbleClassName}></div>
        <div className={oneClassName}></div>
        <div className={twoClassName}></div>
      </div>
      {/* <div className="loadingText">{loadingText}</div> */}
      <PercentageCalculator onCountUpdate={handleCountUpdate} />
      {/* <div className="percentageNumber">{count}%</div> */}
      <Link to="/" className="backButton">
        HOME
      </Link>
    </>
  );
};

export default ConnectionAnimation;
