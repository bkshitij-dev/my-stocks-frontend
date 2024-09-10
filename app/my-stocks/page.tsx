"use client";

import React from 'react'
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'

import ShareSummary from '../components/stock-summary';
import { ApiResponse } from '../types/ApiResponse';

const MyStocks = () => {

  const [currentStocks, setCurrentStocks] = useState<StockDetail[] | null>(null);
  const [zeroInvestmentStocks, setZeroInvestmentStocks] = useState<StockDetail[] | null>(null);
  const [pastStocks, setPastStocks] = useState<StockDetail[] | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [totalInvestment, setTotalInvestment] = useState<number>();
  const [totalValue, setTotalValue] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const router = useRouter();

  let NPRFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'NPR',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/stock-holdings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiResponse: ApiResponse = await response.json();
        const result: StockDetail[] = apiResponse.data;
        setCurrentStocks(result.filter(r => r.holdingQuantity > 0 && r.wacc > 0));
        setZeroInvestmentStocks(result.filter(r => r.holdingQuantity > 0 && r.wacc === 0));
        setPastStocks(result.filter(r => r.holdingQuantity === 0));
        const totalCurrentInvestment = result.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.currentInvestment;
        }, 0);
        setTotalInvestment(totalCurrentInvestment);
        const totalCurrentValue = result.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.currentValue;
        }, 0);
        setTotalValue(totalCurrentValue);
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

  const handleExpandRow = (scrip: string) => {
    let currentExpandedRow = null;
    const isRowExpanded = currentExpandedRow === scrip ? scrip : null;
    const newExpandedRow = isRowExpanded ? null : (currentExpandedRow = scrip);
    if (expandedRow !== scrip) {
      setExpandedRow(newExpandedRow);
    } else {
      setExpandedRow(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">My Stocks</h2>
          <p className="mt-1 text-lg text-gray-700">
            Current Investment: {totalInvestment && NPRFormat.format(totalInvestment)}
          </p>
          <p className="mt-1 text-lg text-gray-700">
            Current Value: {totalValue && NPRFormat.format(totalValue)}
          </p>
          <p className="mt-1 text-lg text-gray-700">
            {
              totalValue && totalInvestment && (totalValue - totalInvestment) > 0 &&
              <span className="text-green-500">Profit: + {NPRFormat.format(totalValue - totalInvestment)}</span>
            }

            {
              totalValue && totalInvestment && (totalValue - totalInvestment) < 0 &&
              <span className="text-red-500">Loss: {NPRFormat.format(Math.abs(totalValue - totalInvestment))}</span>
            }
          </p>
        </div>
        <div>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => router.push('/transactions')}>
            Add New Transaction
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      <span>Scrip</span>
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      Current Quantity
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      Current Investment
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      WACC
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <ShareSummary title="Current Stocks" stocks={currentStocks} expandedRow={expandedRow} handleExpandRow={handleExpandRow} />
                  <ShareSummary title="Zero Investment Stocks" stocks={zeroInvestmentStocks} expandedRow={expandedRow} handleExpandRow={handleExpandRow} />
                  <ShareSummary title="Past Stocks" stocks={pastStocks} expandedRow={expandedRow} handleExpandRow={handleExpandRow} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default MyStocks