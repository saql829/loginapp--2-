import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await login(username, password);
        if (success) {
            const role = localStorage.getItem("role"); // Retrieve the role from localStorage
            // Redirect based on role
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 hover:border-indigo-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 hover:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
