import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return children;  // Render the children components if authenticated
};

export default ProtectedRoute;
