"use client";

import { Fragment, useEffect, useState } from "react";
import { MarketData } from "./types/MarketData";
import LatestStockData from "./components/latest-stock-data";
import Table from "./components/table";
import { StockData } from "./types/StockData";

export default function Home() {

  const ITEMS_PER_PAGE = 10;

  const [marketData, setMarketData] = useState<MarketData>();
  const [paginatedData, setPaginatedData] = useState<StockData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null); 

  const headers: string[] = ["Scrip", "LTP", "Points Changed", "Percentage Changed", "Open", "High", "Low"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/stock-market-history/current-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: MarketData = await response.json();
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

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {marketData &&
        <>
          <div>Data as of {marketData.date} {marketData.time}</div>

          <div>NEPSE Index: {marketData?.index}</div>

          <div>{marketData.percentageChange > 0 ? '+' : ''}{marketData.percentageChange}%</div>

          <Table headers={headers} rows={paginatedData && paginatedData.map(stock => (
            <LatestStockData stock={stock} key={stock.scrip} />
          ))} 
          data={marketData.stocks} paginate={true} itemsPerPage={ITEMS_PER_PAGE}
          setPaginatedRows={setPaginatedData}/>
        </>
      }
    </div>
  );
}
