import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Container } from '../components/Container';

import { Dashboards } from '../pages/Dashboards';
import { Clients } from '../pages/Clients';
import { ManageClient } from '../pages/Clients/ManageClient';
import { Products } from '../pages/Products';
import { ManageProduct } from '../pages/Products/ManageProduct';
import { Orders } from '../pages/Orders';
import { OrderDetail } from '../pages/Orders/OrderDetail';
import { Payments } from '../pages/Payments';
import { Users } from '../pages/Users';
import { ManageUser } from '../pages/Users/ManageUser';
import { Settings } from '../pages/Settings';

function LoggedRoutes() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Dashboards />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/clients/:id' element={<ManageClient />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ManageProduct />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/:id' element={<OrderDetail />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<ManageUser />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Container>
  )
}

export default LoggedRoutes;
