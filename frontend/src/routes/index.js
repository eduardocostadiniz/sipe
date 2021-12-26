import React, { useContext } from "react";

import UserContext from "../contexts/userContext";

import LoggedRoutes from './loggedRoutes';
import DefaultRoutes from './defaultRoutes';

export default function Routes() {
  const { user } = useContext(UserContext);

  return (
    user && user.email ? <LoggedRoutes /> : <DefaultRoutes />
  )
}