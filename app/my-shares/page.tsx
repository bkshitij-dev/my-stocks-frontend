"use client";

import React from 'react'
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'

import ShareSummary from '../components/share-summary';

const MyShares = () => {

  const [currentScripts, setCurrentScripts] = useState<ShareDetail[] | null>(null);
  const [pastScripts, setPastScripts] = useState<ShareDetail[] | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
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
    let currentExpandedRow = null;
    const isRowExpanded = currentExpandedRow === symbol ? symbol : null;
    const newExpandedRow = isRowExpanded ? null : (currentExpandedRow = symbol);
    if (expandedRow !== symbol) {
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
          <h2 className="text-lg font-semibold">My Shares</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all your share holdings
          </p>
        </div>
        <div>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => router.push('/')}>
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
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      <span>Scripts</span>
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      Current Quantity
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      Current Investment
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      Price Per Share
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      LTP
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      Target
                    </th>
                    <th scope="col" className="relative px-4 py-3.5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <ShareSummary title="Current Scripts" scripts={currentScripts} expandedRow={expandedRow} handleExpandRow={handleExpandRow} />
                  <ShareSummary title="Past Scripts" scripts={pastScripts} expandedRow={expandedRow} handleExpandRow={handleExpandRow} />
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