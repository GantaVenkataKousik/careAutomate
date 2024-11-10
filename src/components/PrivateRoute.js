// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { token } = useAuth(); // Assume `useAuth` returns an auth object with `token`

  // Redirect to login if not authenticated
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
