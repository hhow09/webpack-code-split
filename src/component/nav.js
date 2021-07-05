import React, { Component } from "react";
import "./nav.scss";
const Nav = () => (
  <div className="nav">
    <div className="nav-item">
      <a href="/">Home</a>
    </div>
    <div className="nav-item">
      <a href="/todo">Todo</a>
    </div>
  </div>
);

export default Nav;
