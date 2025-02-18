import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../apis/userApis";

function Navbar() {
  const [isUser, setIsUser] = useState(
    sessionStorage.getItem("userId") ? true : false
  );

  const handleLogout = async () => {
    const response = await logoutUser();
    sessionStorage.removeItem("userId");
    setIsUser(false);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-md bg-white fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/home">
          URL Shortner
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mt-3 mt-md-0" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-md-center gap-3">
            <li className="nav-item">
              <Link to="/home" className="nav-link text-secondary">
                Home
              </Link>
            </li>
            {isUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to={"/account"}>
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <div
                    className=" btn btn-outline-danger rounded-5 px-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className=" btn btn-outline-dark rounded-5 px-4"
                  to={"/login"}
                >
                  Get Started
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
