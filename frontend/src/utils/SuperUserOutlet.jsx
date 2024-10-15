import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useUser } from './SWR';

const SuperUserOutlet = ({ fallbackPath = '/403', loginPath = '/login' }) => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  // Get the user details based on the authHeader
  const { user, error } = useUser(auth?.user_id, authHeader);

  // If user is not authenticated, redirect to login page
  if (!auth) {
    return <Navigate to={loginPath} />;
  }

  // If user is authenticated but not a superuser, redirect to "Not Allowed" page
  if (user && !user.is_superuser) {
    return <Navigate to={fallbackPath} />;
  }

  // If authenticated and is a superuser, allow access to the outlet
  return <Outlet />;
};

export default SuperUserOutlet;
