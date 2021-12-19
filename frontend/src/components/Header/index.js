import React from "react";

import { StyledHeader, UserActions, UserAvatar } from './styles';

import YelaWolfImg from '../../assets/img/yelawolf.jpg';

function Header() {
  return (
    <StyledHeader className="header-container">
      <UserActions className="user-actions">
        <span className="ti-shopping-cart"></span>
        <span className="ti-bell"></span>
      </UserActions>
      <UserAvatar className="user-avatar">
        <img src={YelaWolfImg} alt="User avatar" />
      </UserAvatar>
    </StyledHeader>
  )
}

export { Header };
