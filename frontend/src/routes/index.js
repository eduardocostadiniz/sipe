import React, { useContext, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import LoggedRoutes from './loggedRoutes';
import UserContext from "../contexts/userContext";


const ProtectedRoutes = ({ children }) => {
  const { getIdTokenClaims, user } = useAuth0();
  const { loginUser } = useContext(UserContext)

  useEffect(() => {
    (async () => {
      try {
        const idToken = await getIdTokenClaims();

        await loginUser(user.email, idToken.__raw)
      } catch (e) {
        console.error(e);
      }
    })();

  }, [getIdTokenClaims]);

  return (
    <>
      <LoggedRoutes />
      {children}
    </>
  )
}

export default withAuthenticationRequired(ProtectedRoutes, {
  onRedirecting: () => <div>Redirecionando aplicação...</div>,
});