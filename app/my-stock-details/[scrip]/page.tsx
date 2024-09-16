'use client';

import AppLineChart from '@/app/components/app-line-chart';
import { ApiResponse } from '@/app/types/ApiResponse';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const MyStockDetails = () => {
    const params = useParams();
    const scrip = params.scrip as string;
    const router = useRouter();

    const [transactions, setTransactions] = useState<StockTransaction[] | null>(null);
    const [recentData, setRecentData] = useState<MarketRecentData[] | null>(null);
    const [minValue, setMinValue] = useState(Infinity);
    const [maxValue, setMaxValue] = useState(-Infinity);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AppError | null>(null);

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/stock-transactions/stocks/${scrip}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const apiResponse: ApiResponse = await response.json();
            const result: StockTransaction[] = apiResponse.data;
            setTransactions(result);
        } catch (error) {
            if (error instanceof Error) {
                setError({ message: error.message });
            } else {
                setError({ message: 'An unknown error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/stock-history/scrip/${scrip}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const apiResponse: ApiResponse = await response.json();
            const result: MarketRecentData[] = apiResponse.data;
            setRecentData(result);

            const { min, max } = result.reduce((acc, { index }) => {
                return {
                    min: Math.min(acc.min, index),
                    max: Math.max(acc.max, index)
                };
            }, { min: minValue, max: maxValue });

            setMinValue(min);
            setMaxValue(max);
        } catch (error) {
            if (error instanceof Error) {
                setError({ message: error.message });
            } else {
                setError({ message: 'An unknown error occurred' });
            }
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchRecentData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">{scrip}</h2>
                </div>
                <div>
                    <button
                        type="button"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        onClick={() => router.push('/my-stocks')}>
                        Back to My Stocks
                    </button>
                </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 overflow-hidden mt-12">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="w-1/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                <span>S.No.</span>
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Transaction Type
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Stock Type
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Quantity
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Rate
                                            </th>
                                            <th scope="col" className="w-1/12 relative px-4 py-3.5">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {transactions && transactions.map((transaction, idx) => (
                                            <tr key={idx}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="text-sm font-medium text-gray-600">
                                                        {idx + 1}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="text-sm text-gray-900 ">{transaction.transactionType}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="text-sm text-gray-900 ">{transaction.stockType}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    <div className="text-sm text-gray-900 ">{transaction.quantity}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    <div className="text-sm text-gray-900 ">{transaction.rate}</div>
                                                </td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {recentData && (
                    <div className="flex-1 h-[500px]">
                        <AppLineChart data={recentData} min={minValue} max={maxValue} title='Recent Data' />
                    </div>
                )}
            </div>
        </section>

    );
};

export default MyStockDetails;