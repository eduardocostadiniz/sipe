import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

import Routes from './routes';

import './assets/themefy/themify-icons.css';
import { UserProvider } from './contexts/userContext';
import { CustomThemeProvider } from './contexts/customThemeContext';
import { LoadingProvider } from './contexts/loadingContext';

const Auth0ProviderWrapper = ({ children }) => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {children}
    </Auth0Provider>
  )
}


function App() {
  return (
    <React.StrictMode>
      <CustomThemeProvider>
        <UserProvider>
          <Auth0ProviderWrapper>
            <LoadingProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </LoadingProvider>
          </Auth0ProviderWrapper>
        </UserProvider>
      </CustomThemeProvider>
    </React.StrictMode >
  )
}

export default App;
