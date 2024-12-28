import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('https://aptech.heritagejewels.com.pk/microservices/giftcard.php');
                setCards(response.data); // Assuming response contains card data
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="p-2">Card Number</th>
                        <th className="p-2">Balance</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card, index) => (
                        <tr key={`${card.cardNumber}-${index}`}> {/* Unique key using cardNumber + index */}
                            <td className="p-2">{card.cardNumber}</td>
                            <td className="p-2">{card.balance}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => alert(`View details for card ${card.cardNumber}`)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded-md"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCards;
