import React, { useEffect, useState } from 'react'
import Table from '../table'
import { ApiResponse } from '@/app/types/ApiResponse';
import stockMarketHistoryService from '@/app/services/stockMarketHistoryService';
import Link from 'next/link';

const TopMoversTable = ({ title, slug }: { title: string, slug: string }) => {

    const [topMovers, setTopMovers] = useState<TopMoversData[]>([]);
    const [paginatedData, setPaginatedData] = useState<TopMoversData[]>();
    const [days, setDays] = useState(1);

    const headers: string[] = ["Scrip", "Latest % +/-", "LTP"];
    if (days > 1) {
        headers.splice(1, 0, `${days}-day % +/-`);
    }

    const ITEMS_PER_PAGE = 10;

    const fetchMoversData = async (slug: string, days: number) => {
        try {
            const apiResponse: ApiResponse = await stockMarketHistoryService.getTopMoversData(slug, days);
            const result: TopMoversData[] = apiResponse.data;
            setTopMovers(result);
            setPaginatedData(result.slice(0, ITEMS_PER_PAGE));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMoversData(slug, days);
        const intervalId = setInterval(() => {
            fetchMoversData(slug, days);
        }, 60000);
        return () => clearInterval(intervalId);
    }, [days]);

    const getTextColor = () => {
        return slug === "gainers" ? "text-green-500" : "text-red-500";
    }

    const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDays(Number(event.target.value));
      };

    return (
        <div>
            {/* <h1 className="text-md text-center font-semibold">{days == 1 ? 'Latest' : ''} {title} {days == 1 ? '' : `in the last ${days} days`}</h1> */}
            <h1 className="text-md text-center font-semibold">
                {days === 1 ? 'Latest' : ''} {title}{' '}
                {days === 1 ? '' : `in the last ${days} days`}
            </h1>

            {/* Select input for number of days */}
            <select value={days} onChange={handleDaysChange} className="mt-4 p-2">
                {Array.from({ length: 26 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>

            <Table
                headers={headers}
                rows={
                    paginatedData && paginatedData.map((stock) =>
                        <tr key={stock.scrip}>
                            <td className="px-4 py-3.5">
                                <div className="text-sm font-medium underline">
                                    <Link href={`/stock-details/${stock.scrip}`}>{stock.scrip}</Link>
                                </div>
                            </td>
                            {days > 1 &&
                                <td className={`px-4 py-3.5 ${getTextColor()}`}>
                                    <div className="text-sm font-medium">{stock.totalPercentageChange}</div>
                                </td>
                            }

                            <td className={`px-4 py-3.5 ${stock.latestPercentageChange > 0 ? "text-green-500"
                                : stock.latestPercentageChange < 0 ? "text-red-500" : "text-blue-500"}`}>
                                <div className="text-sm font-medium">{stock.latestPercentageChange}</div>
                            </td>
                            <td className={`px-4 py-3.5 ${stock.latestPercentageChange > 0 ? "text-green-500"
                                : stock.latestPercentageChange < 0 ? "text-red-500" : "text-blue-500"}`}>
                                <div className="text-sm font-medium">{stock.ltp}</div>
                            </td>
                        </tr>
                    )
                }
                data={topMovers}
                paginate={true}
                itemsPerPage={ITEMS_PER_PAGE}
                setPaginatedRows={setPaginatedData}
            />
        </div>
    )
}

export default TopMoversTable