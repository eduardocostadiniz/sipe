import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Routes from './routes';

import './assets/themefy/themify-icons.css';
import { UserProvider } from './contexts/userContext';
import { CustomThemeProvider } from './contexts/customThemeContext';
import { KeycloakProvider } from './contexts/keycloakContext';


function App() {
  return (
    <React.StrictMode>
      <CustomThemeProvider>
        <UserProvider>
          <KeycloakProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </KeycloakProvider>
        </UserProvider>
      </CustomThemeProvider>
    </React.StrictMode>
  )
}

export default App;
