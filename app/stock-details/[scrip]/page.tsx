'use client';

import AppLineChart from '@/app/components/app-line-chart';
import { ApiResponse } from '@/app/types/ApiResponse';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const StockDetails = () => {
    const params = useParams();
    const scrip = params.scrip as string;
    const router = useRouter();

    const [recentData, setRecentData] = useState<MarketRecentData[] | null>(null);
    const [minValue, setMinValue] = useState(Infinity);
    const [maxValue, setMaxValue] = useState(-Infinity);
    const [error, setError] = useState<AppError | null>(null);

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
        fetchRecentData();
    }, []);

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
                        onClick={() => router.push('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-6">
                {recentData && (
                    <div className="flex-1 h-[500px]">
                        <AppLineChart data={recentData} min={minValue} max={maxValue} title='Recent Data' />
                    </div>
                )}
            </div>
        </section>

    );
};

export default StockDetails;