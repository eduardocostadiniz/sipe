import React from "react";

import YelaWolfImg from '../../assets/img/yelawolf.jpg';

function Header() {
  return (
    <header className="header-container">
      <div className="user-actions">
        <span className="ti-shopping-cart"></span>
        <span className="ti-bell"></span>
      </div>
      <div className="user-avatar">
        <img src={YelaWolfImg} alt="User avatar" />
      </div>
    </header>
  )
}

export { Header };
