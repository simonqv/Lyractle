// PrivateRoute.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

export const PrivateRoute = ({ element, authenticated }) => {
  console.log('Authenticated:', authenticated);
  console.log('element', element);

  return authenticated ? element : <Navigate to="/login" />;
};
