// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ element, authenticated, guest }) => {
  return authenticated || guest ? element : <Navigate to="/login" />;
};
