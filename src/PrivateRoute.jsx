// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ element, authenticated, guest }) => {
  console.log('Authenticated:', authenticated);
  console.log('element', element);

  return authenticated || guest ? element : <Navigate to="/login" />;
};
