import React from "react";
import "../CSS/Loader.css";

const Loader = () => {
  return (
    <div className="loader h-100 d-flex align-items-center justify-content-center fs-6 position-fixed top-0 start-0 bottom-0 end-0 fs-sm-3">
      <div className="d-flex gap-5">
        <h1 className="text1 m">M</h1>
        <h1 className="text2 a">A</h1>
        <h1 className="text3 s">S</h1>
      </div>
    </div>
  );
};

export default Loader;
