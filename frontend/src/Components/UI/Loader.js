import React from "react";
import "./UI.css";

function Loader() {
  return (
    <div className="loader-container">
      <img
        className="loader-image"
        src={process.env.PUBLIC_URL + "/Loading.png"}
        alt="Loading..."
      />
      <div className="btn loader-button" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {"     "}Loading...
      </div>
    </div>
  );
}

export default Loader;
