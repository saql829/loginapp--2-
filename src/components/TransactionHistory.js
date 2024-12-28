import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(
                    'https://aptech.heritagejewels.com.pk/microservices/transaction.php'
                );
                setTransactions(response.data);
            } catch (err) {
                setError('Error fetching transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="p-4 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Transaction History</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Transaction ID</th>
                            <th className="border px-4 py-2">Card Number</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="border px-4 py-2">{transaction.id}</td>
                                <td className="border px-4 py-2">{transaction.cardnumber}</td>
                                <td className="border px-4 py-2">{transaction.amount}</td>
                                <td className="border px-4 py-2">{transaction.datecreated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;
