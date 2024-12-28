import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistoryAdmin = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://aptech.heritagejewels.com.pk/microservices/transaction.php');
                setTransactions(response.data); // Assuming response contains transaction data
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="p-2">Date Time</th>
                        <th className="p-2">Location</th>
                        <th className="p-2">Card Number</th>
                        <th className="p-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={`${transaction.cardNumber}-${index}`}> {/* Unique key using cardNumber + index */}
                            <td className="p-2">{transaction.dateTime}</td>
                            <td className="p-2">{transaction.location}</td>
                            <td className="p-2">{transaction.cardNumber}</td>
                            <td className="p-2">{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistoryAdmin;
