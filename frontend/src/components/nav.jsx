import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Nav() {
  const [active, setActive] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    console.log(currentPath);
    setActive(currentPath);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <Link className="navbar-brand" to="#">
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
          <li className={active === "/" ? "nav-item active" : "nav-item"}>
            <Link onClick={() => history.push("/")} className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={active === "/login" ? "nav-item active" : "nav-item"}>
            <Link
              onClick={() => history.push("/login")}
              className="nav-link"
              to="/login"
            >
              Log In
            </Link>
          </li>
          <li className={active === "/signup" ? "nav-item active" : "nav-item"}>
            <Link
              onClick={() => history.push("/signup")}
              className="nav-link"
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
