import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Routes from './routes';

import './assets/themefy/themify-icons.css';
import { UserProvider } from './contexts/userContext';
import { CustomThemeProvider } from './contexts/customThemeContext';
import { KeycloakProvider } from './contexts/keycloakContext';
import { LoadingProvider } from './contexts/loadingContext';


function App() {
  return (
    <React.StrictMode>
      <CustomThemeProvider>
        <UserProvider>
          <KeycloakProvider>
            <LoadingProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </LoadingProvider>
          </KeycloakProvider>
        </UserProvider>
      </CustomThemeProvider>
    </React.StrictMode >
  )
}

export default App;
