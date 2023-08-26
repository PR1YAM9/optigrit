import React from "react";
import "./Hero.css";
import logsImg from "../../images/logs.jpg";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <div className="heroTextCover">
          <h1 className="heroText">
            Logs - Search <br /> and Filter Tool
          </h1>
          <h4 className="heroLower">Efficiently manage and analyze logs</h4>
        </div>
        <div className="right">
        <div className="blackCircle1"></div>
          <img className="logsIMg" src={logsImg} alt="logs" />
          <div className="blackCircle2"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
