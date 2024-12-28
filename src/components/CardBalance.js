import React, { useState } from 'react';
import axios from 'axios';

const CardBalance = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCardDetails = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `https://aptech.heritagejewels.com.pk/microservices/singlecard.php?cardnumber=${cardNumber}`
            );
            
            // Debugging response
            console.log(response.data);

            // Check if response contains valid card number and data
            if (response.status === 200 && response.data.cardnumber) {
                setCardData(response.data);
            } else {
                setError('Card not found');
            }
        } catch (err) {
            setError('Error fetching card details');
            console.error(err); // Log error details
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Check Card Balance</h3>
            <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter Card Number"
            />
            <button onClick={fetchCardDetails} disabled={loading}>
                {loading ? 'Loading...' : 'Check Balance'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {cardData && (
                <div>
                    <h4>Card Balance: {cardData.cardbalance}</h4> {/* Use cardbalance from response */}
                    <p>Card Value: {cardData.cardvalue}</p>
                    <p>Card Number: {cardData.cardnumber}</p>
                </div>
            )}
        </div>
    );
};

export default CardBalance;
