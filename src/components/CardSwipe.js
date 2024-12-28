import React, { useState } from 'react';
import axios from 'axios';

const CardSwipe = ({ setCardNumber }) => {
    const [cardInput, setCardInput] = useState('');
    const [cardDetails, setCardDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCardSwipe = async () => {
        if (!cardInput) {
            setError('Please enter a card number.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `https://aptech.heritagejewels.com.pk/microservices/singlecard.php?cardnumber=${cardInput}`
            );
            if (response.data) {
                setCardDetails(response.data);
                setCardNumber(cardInput);
            } else {
                setError('Card not found or invalid.');
            }
        } catch (err) {
            setError('Error fetching card details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Swipe Card</h2>
            <input
                type="text"
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                placeholder="Enter Card Number"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
                onClick={handleCardSwipe}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-md mt-2"
            >
                {loading ? 'Loading...' : 'Fetch Card Details'}
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {cardDetails && (
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold">Card Balance: {cardDetails.balance}</h3>
                </div>
            )}
        </div>
    );
};

export default CardSwipe;
