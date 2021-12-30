import React, { useContext } from "react";
import UserContext from "../../contexts/userContext";

import { StyledHeader, UserActions, UserAvatar } from './styles';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <StyledHeader className="header-container">
      <UserActions className="user-actions">
        <span className="ti-shopping-cart"></span>
        <span className="ti-bell"></span>
      </UserActions>
      <UserAvatar className="user-avatar">
        <img src={user.avatar} alt="User avatar" />
      </UserAvatar>
    </StyledHeader>
  )
}

export { Header };
