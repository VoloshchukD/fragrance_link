import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="navbar">
        <Link to={"/"}>Home</Link>
        <Link to={"perfumes"}>Perfumes</Link>
        <Link to={"users"}>Users</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
