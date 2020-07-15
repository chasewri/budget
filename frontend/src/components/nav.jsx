import React from "react";
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <Link className="navbar-brand" href="#">
        FDV
      </Link>
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
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link disabled" href="#">
              Disabled
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
