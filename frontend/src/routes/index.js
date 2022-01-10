import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../contexts/userContext";

import LoggedRoutes from './loggedRoutes';
import DefaultRoutes from './defaultRoutes';
import { useKeycloak } from "@react-keycloak/web";

export default function Routes() {
  const { user } = useContext(UserContext);
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <h3>Um momento, carregando a aplicação... !!!</h3>;
  }

  if (keycloak?.authenticated) {
    return <LoggedRoutes />;
  }

  return <></>;
}