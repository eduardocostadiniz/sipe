import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Dashboards } from './pages/Dashboards';
import { Clients } from './pages/Clients';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Payments } from './pages/Payments';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';

import { Container } from './components/Container';

import theme from './themes/theme';
import { GlobalStyle } from './styles/globals';

import './assets/themefy/themify-icons.css';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Container>
            <Routes>
              <Route path='/' element={<Dashboards />} />
              <Route path='/clients' element={<Clients />} />
              <Route path='/products' element={<Products />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/payments' element={<Payments />} />
              <Route path='/users' element={<Users />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </BrowserRouter></React.StrictMode>
  )
}

export default App;
