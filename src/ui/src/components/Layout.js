import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link">
                <Link to={"/"}>Home</Link>
              </a>
              <a className="nav-link">
                <Link to={"perfumes"}>Perfumes</Link>
              </a>
              <a className="nav-link">
                <Link to={"users"}>Users</Link>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
