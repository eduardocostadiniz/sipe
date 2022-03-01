import { ReactKeycloakProvider } from '@react-keycloak/web';
import React, { useContext } from 'react';
import UserContext from './userContext';
import { keycloak, initConfig } from '../keycloak';
import http from '../services/http';

const KeycloakContext = React.createContext({});

export const KeycloakProvider = ({ children }) => {

  const { loginUser, logoutUser } = useContext(UserContext);

  const eventFactory = {
    'onAuthSuccess': () => {
      const tokenParsed = keycloak.tokenParsed;
      loginUser(tokenParsed.email, keycloak.token);
      setInterval(function () {
        keycloak.updateToken(15)
          .then(() => {
            http.defaults.headers.Authorization = `Bearer ${keycloak.token}`
          });
      }, 290000);
    },
    'onRefreshToken': () => { console.log('Token refrescado') },
    'onAuthLogout': () => { console.log('Usuário deslogado'); }
  }

  function onEventHandler(event, error) {
    try {
      const fn = eventFactory[event];
      fn()
    } catch (error) { }
  }

  function disconnectUser() {
    logoutUser();
    keycloak.logout()
  }

  return (
    <KeycloakContext.Provider value={{ disconnectUser }}>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={initConfig}
        onEvent={(event, error) => onEventHandler(event, error)}
      >
        {children}
      </ReactKeycloakProvider>
    </KeycloakContext.Provider>
  )

}

export default KeycloakContext;