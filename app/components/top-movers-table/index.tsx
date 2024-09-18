import React, { useEffect, useState } from 'react'
import Table from '../table'
import { ApiResponse } from '@/app/types/ApiResponse';
import stockMarketHistoryService from '@/app/services/stockMarketHistoryService';
import Link from 'next/link';

const TopMoversTable = ({ title, headers, slug }: { title: string, headers: string[], slug: string }) => {

    const [topMovers, setTopMovers] = useState<TopMoversData[]>([]);

    const fetchMoversData = async (slug: string) => {
        try {
            const apiResponse: ApiResponse = await stockMarketHistoryService.getTopMoversData(slug);
            const result: TopMoversData[] = apiResponse.data;
            setTopMovers(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMoversData(slug);
        const intervalId = setInterval(() => {
            fetchMoversData(slug);
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const getTextColor = () => {
        return slug === "gainers" ? "text-green-500" : "text-red-500";
    }

    return (
        <div>
            <h1 className="text-md text-center font-semibold">{title}</h1>
            <Table
                headers={headers}
                rows={
                    topMovers.map((stock) =>
                        <tr key={stock.scrip}>
                            <td className={`px-4 py-3.5 ${getTextColor()}`}>
                                <div className="text-sm font-medium">
                                    <Link href={`/stock-details/${stock.scrip}`}>{stock.scrip}</Link>
                                </div>
                            </td>
                            <td className={`px-4 py-3.5 ${getTextColor()}`}>
                                <div className="text-sm font-medium">{stock.totalPercentageChange}</div>
                            </td>

                            <td className={`px-4 py-3.5 ${stock.latestPercentageChange > 0 ? "text-green-500" 
                                    : stock.latestPercentageChange < 0 ? "text-red-500" : "text-blue-500"}`}>
                                <div className="text-sm font-medium">{stock.latestPercentageChange}</div>
                            </td>
                        </tr>
                    )
                }
            />
        </div>
    )
}

export default TopMoversTable