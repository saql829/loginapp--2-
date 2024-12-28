import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle login
    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://aptech.heritagejewels.com.pk/microservices/login.php',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = response.data;

            if (response.status === 200 && data.success) {
                setIsAuthenticated(true);
                return true
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
