import React from 'react';
//import { useAuth } from './context/AuthContext';
import AllCards from './AllCards'; // Import the AllCards component
import TransactionHistoryAdmin from './TransactionHistoryAdmin'; // Import the TransactionHistoryAdmin component
import ManageCards from './ManageCards'; // Optional, for managing cards

const SuperAdminDashboard = () => {
    
    return (
        <div className="p-4 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>
            
            {/* Cards Management Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">All Cards</h2>
                <AllCards />
            </div>

            {/* Transaction History Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Transaction History</h2>
                <TransactionHistoryAdmin />
            </div>

            {/* Optional Manage Cards Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Manage Cards</h2>
                <ManageCards />
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
