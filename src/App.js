import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SuperAdminDashboard from './components/Pages/SuperAdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Ensure you have a default route for "/"
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Root route */}
                    <Route path="/" element={<Login />} /> {/* Or another component as the default */}
                    
                    {/* Login Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Shop User Dashboard Route */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Super Admin Dashboard Route */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute>
                                <SuperAdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
