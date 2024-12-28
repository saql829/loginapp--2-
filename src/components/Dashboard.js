import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Import Auth context
import CardSwipe from './CardSwipe';  // Shop user component
import ChargeCard from './ChargeCard';  // Shop user component
import TransactionHistory from './TransactionHistory';  // Shop user component
import AllCards from './Pages/AllCards';  // Admin component
import TransactionHistoryAdmin from './Pages/TransactionHistoryAdmin';  // Admin component
import ManageCards from './Pages/ManageCards';  // Admin component

const Dashboard = () => {
    const { logout } = useAuth();  // Using logout function from AuthContext
    const [cardNumber, setCardNumber] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        // Get the role from localStorage on component mount
        const userRole = localStorage.getItem('role');
        setRole(userRole);  // Set the role for conditional rendering
    }, []);

    return (
        <div className="p-4 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">{role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                    Logout
                </button>
            </div>

            {role === 'admin' ? (
                // Admin Dashboard Content
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">All Cards</h2>
                        <AllCards />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Transaction History</h2>
                        <TransactionHistoryAdmin />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Manage Cards</h2>
                        <ManageCards />
                    </div>
                </div>
            ) : (
                // Shop User Dashboard Content
                <div className="flex gap-4">
                    <div className="w-1/3">
                        <CardSwipe setCardNumber={setCardNumber} />
                    </div>

                    <div className="w-2/3">
                        {cardNumber && <ChargeCard cardNumber={cardNumber} />}
                        <TransactionHistory />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
