import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CardSwipe from './CardSwipe';
import ChargeCard from './ChargeCard';
import TransactionHistory from './TransactionHistory';
import AllCards from './AllCards';
import TransactionHistoryAdmin from './TransactionHistoryAdmin';
import ManageCards from './ManageCards';
import { Line } from 'react-chartjs-2';  // Importing the Line chart
import { Chart } from 'chart.js';  // Importing Chart.js

// Import necessary components for Chart.js
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register components with Chart.js
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { logout } = useAuth();
    const [cardNumber, setCardNumber] = useState('');
    const [role, setRole] = useState('');
    
    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);
    
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Card Usage Over Time',
                data: [10, 20, 30, 40, 50],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }
        ]
    };
    
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true
            }
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">
                    {role === 'admin' ? 'Admin Dashboard' : 'Shop User Dashboard'}
                </h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
                >
                    Logout
                </button>
            </div>
            
            {role === 'admin' ? (
                // Admin Dashboard Content
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Cards</h2>
                        <AllCards />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Transaction History</h2>
                        <TransactionHistoryAdmin />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Cards</h2>
                        <ManageCards />
                    </div>
                </div>
            ) : (
                // Shop User Dashboard Content
                <div className="flex gap-6">
                    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Swipe Card</h2>
                        <CardSwipe setCardNumber={setCardNumber} />

                        {/* Chart Section */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Card Usage Stats</h2>
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 bg-gray-50 p-6 rounded-lg shadow-md">
                        {cardNumber && <ChargeCard cardNumber={cardNumber} />}
                        <TransactionHistory />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;