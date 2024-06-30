import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RequireAuth = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />;
  }

  if (role && !user.roles.includes(role)) {
    return <Navigate to='/' />;
  }

  return children;
};

export default RequireAuth;
