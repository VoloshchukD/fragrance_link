import React from "react";
import { Link, Outlet } from "react-router-dom";
import { NotificationProvider } from "./alert/NotificationContext";

function Layout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
              <Link to={"perfumes"} className="nav-link">
                Perfumes
              </Link>
              <Link to={"users"} className="nav-link">
                Users
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div>
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
      </div>
    </>
  );
}

export default Layout;
