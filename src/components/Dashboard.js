import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CardSwipe from './CardSwipe'; // Import the CardSwipe component
import ChargeCard from './ChargeCard'; // Import the ChargeCard component
import TransactionHistory from './TransactionHistory'; // Import the TransactionHistory component

const Dashboard = () => {
    const { logout } = useAuth();
    
    // Define the state for cardNumber
    const [cardNumber, setCardNumber] = useState('');

    return (
        <div className="p-4 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                    Logout
                </button>
            </div>

            <div className="flex gap-4">
                <div className="w-1/3">
                    <CardSwipe setCardNumber={setCardNumber} />
                </div>

                <div className="w-2/3">
                    {cardNumber && <ChargeCard cardNumber={cardNumber} />}
                    <TransactionHistory />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
