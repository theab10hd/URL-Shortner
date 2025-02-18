import React from "react";
import { Link } from "react-router-dom";

function PnF() {
  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <p className="m-0">Error Page Not Found or Your link is Broken.</p>
        <h1 className="m-0 fw-bold" style={{ fontSize: 100 }}>
          404!
        </h1>
        <Link to="/home" className="btn btn-dark rounded-5 px-4">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default PnF;
