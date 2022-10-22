import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  React.useEffect(() => {
    const links = document.querySelectorAll(".nav-links li a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        const linkActive = document.querySelector(".nav-links li .active");
        linkActive?.classList.remove("active");
        link.classList.add("active");
      });
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="bx bx-code-alt"></i>
        <span className="logo_name">
          <Link className="logo_name" to="/">
            Pashi
          </Link>
        </span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <i className="bx bx-box"></i>
            <span className="links_name">Products</span>
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <i className="bx bx-category"></i>
            <span className="links_name">Categories</span>
          </Link>
        </li>
        <li>
          <Link to="/comments">
            <i className="bx bx-comment"></i>
            <span className="links_name">Comments</span>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <i className="bx bx-list-ul"></i>
            <span className="links_name">Order</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="bx bx-cog"></i>
            <span className="links_name">Setting</span>
          </Link>
        </li>
        <li className="log_out">
          <Link to="/">
            <i className="bx bx-log-out"></i>
            <span className="links_name">Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
