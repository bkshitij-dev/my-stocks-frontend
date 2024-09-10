'use client';

import React from 'react';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import LatestStockData from "./components/latest-stock-data";
import Table from "./components/table";

import { ApiResponse } from "./types/ApiResponse";
import { MarketData } from "./types/MarketData";
import { StockData } from "./types/StockData";
import UpArrow from './components/icons/up-arrow';
import DownArrow from './components/icons/down-arrow';

export default function Home() {

  const router = useRouter();

  const ITEMS_PER_PAGE = 10;

  const [marketData, setMarketData] = useState<MarketData>();
  const [paginatedData, setPaginatedData] = useState<StockData[]>();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const headers: string[] = ["Scrip", "LTP", "Points Changed", "Percentage Changed", "Open", "High", "Low"];

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/stock-market-history/current-data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const apiResponse: ApiResponse = await response.json();
      const result: MarketData = apiResponse.data;
      setMarketData(result);
      setPaginatedData(result.stocks.slice(0, ITEMS_PER_PAGE));
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

  useEffect(() => {
    fetchData();
    // Set up the interval
    const intervalId = setInterval(fetchData, 60000);
    // Clean up the interval on component unmount or effect change
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const filteredData = getFilteredData();
    setPaginatedData(filteredData?.slice(0, ITEMS_PER_PAGE));
  }, [query]);

  const getFilteredData = () => {
    if (query === "") {
      return marketData?.stocks;
    }
    return marketData?.stocks.filter(stock => stock.scrip.toLowerCase().startsWith(query.toLowerCase()));
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuery(e.target.value);
  }

  const getTextColorByPointsChange = () => {
    if (marketData == null) {
      return '';
    }
    return marketData.percentageChange > 0 ? 'text-green-500'
      : marketData.percentageChange < 0 ? 'text-red-500'
        : 'text-blue-500';
  }

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Image
              src="/stock.png"
              width={30}
              height={30}
              alt="My Stocks"
              onClick={() => router.push("/")}
            />
          </span>
          <span className="font-bold">My Stocks</span>
        </div>
        <div className="hidden space-x-2 lg:block">
          <button
            type="button"
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {marketData &&
          <>
            <div className="flex items-end justify-between p-4 bg-gray-100">
              <div className="flex flex-col">
                <div className="text-sm text-gray-600 mb-2">
                  <small><strong>Last updated on:</strong> {marketData?.date} {marketData?.time}</small>
                </div>

                <div className="flex items-center bg-white border border-gray-300 rounded-lg p-4">
                  <div className="mr-4 text-lg font-semibold">
                    NEPSE Index: <span className={getTextColorByPointsChange()}>{marketData?.index}</span>
                  </div>
                  <div className={`text-lg font-semibold flex ${getTextColorByPointsChange()}`}>
                    {marketData.pointsChange > 0 ? <><UpArrow /> {`+`} </> 
                      : marketData.pointsChange < 0 ? <DownArrow />
                      : <></>}
                    {marketData.pointsChange} ({marketData.percentageChange}%)
                  </div>
                </div>
              </div>

              <input
                type="text"
                name="companyId"
                className="border border-gray-300 rounded-lg px-4 py-2 max-w-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search scrip"
                value={query}
                onChange={handleOnChange}
              />
            </div>

            <Table headers={headers} rows={paginatedData && paginatedData.map(stock => (
              <LatestStockData stock={stock} key={stock.scrip} />
            ))}
              data={getFilteredData()} paginate={true} itemsPerPage={ITEMS_PER_PAGE}
              setPaginatedRows={setPaginatedData} />
          </>
        }
      </div>
    </div>
  )
}
