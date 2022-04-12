import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Container } from '../components/Container';

import { Dashboards } from '../pages/Dashboards';
import { Clients } from '../pages/Clients';
import { Products } from '../pages/Products';
import { Orders } from '../pages/Orders';
import { Payments } from '../pages/Payments';
import { Users } from '../pages/Users';
import { NewUser } from '../pages/Users/NewUser';
import { Settings } from '../pages/Settings';

function LoggedRoutes() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Dashboards />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/products' element={<Products />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/new' element={<NewUser />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Container>
  )
}

export default LoggedRoutes;
