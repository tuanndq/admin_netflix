import React from "react";
import "./loading.css";
import LoadIcon from "./Bean Eater-1s-200px.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img src={LoadIcon} alt="loading" />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
