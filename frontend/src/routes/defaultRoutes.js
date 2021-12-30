import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from '../pages/Login';

function DefaultRoutes() {
  return (
    <Routes>
      <Route index path='/' element={<Login />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default DefaultRoutes;
