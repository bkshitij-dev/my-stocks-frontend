"use client";

import React, { Fragment } from 'react'
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'

const MyShares = () => {

  const [currentScripts, setCurrentScripts] = useState<ShareDetail[] | null>(null);
  const [pastScripts, setPastScripts] = useState<ShareDetail[] | null>(null);
  const [expandedRows, setExpandedRows] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/script-transactions/scripts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: ShareDetail[] = await response.json();
        setCurrentScripts(result.filter(r => r.currentQuantity > 0));
        setPastScripts(result.filter(r => r.currentQuantity === 0));
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

  const handleExpandRow = (symbol: string) => {
    let currentExpandedRows = null;
    const isRowExpanded = currentExpandedRows === symbol ? symbol : null;
    const newExpandedRows = isRowExpanded ? null : (currentExpandedRows = symbol);
    if (expandedRows !== symbol) {
      setExpandedRows(newExpandedRows);
    } else {
      setExpandedRows(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">My Shares</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all your share holdings
          </p>
        </div>
        <div>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => router.push('/')}
          >
            Add new transaction
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
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      <span>Scripts</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Current Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Current Investment
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Price Per Share
                    </th>
                    <th scope="col" className="relative px-4 py-3.5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={5}
                      scope="col"
                      className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500">
                      Current Scripts
                    </th>
                  </tr>
                  {currentScripts && currentScripts.map(script => (
                    <Fragment key={script.symbol}>
                      <tr onClick={() => handleExpandRow(script.symbol)}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {script.symbol}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">{script.currentQuantity}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900 ">{script.currentInvestment}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          <div className="text-sm text-gray-900 ">{script.pricePerShare}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <a href="#" className="text-gray-700">
                            Edit
                          </a>
                        </td>
                      </tr>
                      {expandedRows === script.symbol ? (
                        <tr key={`${script.symbol}-expand`} className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500">
                          <td colSpan={5} className="collaps-viewer">
                            <div className="flex space-x-6 pl-4 py-4">
                              <div className="flex-1">
                                <div className="font-semibold">Total Buy Quantity</div>
                                <div className="text-sm text-gray-900">{script.totalBuyQuantity}</div>
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold">Total Sell Quantity</div>
                                <div className="text-sm text-gray-900">{script.totalSellQuantity}</div>
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold">Total Buy Amount</div>
                                <div className="text-sm text-gray-900">{script.totalBuy}</div>
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold">Total Sell Amount</div>
                                <div className="text-sm text-gray-900">{script.totalSell}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))}
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={5}
                      scope="col"
                      className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500">
                      Past Scripts
                    </th>
                  </tr>
                  {pastScripts && pastScripts.map(script => (
                    <Fragment key={script.symbol}>
                      <tr onClick={() => handleExpandRow(script.symbol)}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {script.symbol}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">{script.currentQuantity}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900 ">{script.currentInvestment}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          <div className="text-sm text-gray-900 ">{script.pricePerShare}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <a href="#" className="text-gray-700">
                            Edit
                          </a>
                        </td>
                      </tr>
                      {expandedRows === script.symbol ? (
                        <tr key={`${script.symbol}-expand`} className="bg-gray-50">
                          <td colSpan={5} className="collaps-viewer">
                            <div>Total Buy Quantity: {script.totalBuyQuantity}</div>
                            <div>Total Sell Quantity: {script.totalSellQuantity}</div>
                            <div>Total Buy Amount: {script.totalBuy}</div>
                            <div>Total Sell Amount: {script.totalSell}</div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default MyShares