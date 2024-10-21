import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SuperUserOutlet = ({ fallbackPath = '/403', loginPath = '/login' }) => {
  const { authtokens, SGUser } = useContext(AuthContext)
  const auth = AuthContext.access
  const user = SGUser

  // If user is not authenticated, redirect to login page
  if (!auth) {
    return <Navigate to={loginPath} />;
  }

  // If user is authenticated but not a superuser, redirect to "Not Allowed" page
  if (!user?.is_superuser) {
    return <Navigate to={fallbackPath} />;
  }

  // If authenticated and is a superuser, allow access to the outlet
  return <Outlet />;
};

export default SuperUserOutlet;
