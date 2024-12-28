import React, { useState } from 'react';

const ManageCards = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [balance, setBalance] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use your API endpoint for adding/editing card details
            await axios.post('https://aptech.heritagejewels.com.pk/microservices/addtransaction.php', {
                cardNumber,
                balance,
            });
            alert('Card managed successfully');
        } catch (error) {
            alert('Error managing card');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Manage Card</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2">Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Balance</label>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Manage Card
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageCards;
