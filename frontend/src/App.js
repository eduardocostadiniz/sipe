import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Routes from './routes';

import './assets/themefy/themify-icons.css';
import { UserProvider } from './contexts/userContext';
import { CustomThemeProvider } from './contexts/customThemeContext';

function App() {
  return (
    <React.StrictMode>
      <CustomThemeProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </UserProvider>
      </CustomThemeProvider>
    </React.StrictMode>
  )
}

export default App;
