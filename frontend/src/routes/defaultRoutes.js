import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Login } from '../pages/Login';

function DefaultRoutes() {
  return (
    <Routes>
      <Route index path='/' element={<Login />} />
    </Routes>
  )
}

export default DefaultRoutes;
