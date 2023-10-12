import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Smart Attendance system
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                present list
              </a>
            </li>

            <li className="nav-item active">
              <a className="nav-link" href="/absent">
                Absent list
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
