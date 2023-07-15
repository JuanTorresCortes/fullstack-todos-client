import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <br />
      <Link to="/todo-form">New ToDo</Link>
    </div>
  );
};

export default NavBar;
