import { Link, Outlet } from "react-router-dom";
import "../App.css";
import React from "react";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="characters">Characters</Link> |{" "}
          </li>
          <li>
            <Link to="quotes">Quotes</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
