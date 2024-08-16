"use client";

import React, { Fragment } from 'react'
import { useRouter } from 'next/navigation';

import StockHistoryAggregated from '../stock-history-aggregated'

const StockSummary = (
    { title, stocks, expandedRow, handleExpandRow }:
        { title: string, stocks: StockDetail[] | null, expandedRow: string | null, handleExpandRow: Function }) => {

    const router = useRouter();

    const viewStock = (e: any, scrip: string) => {
        e.stopPropagation();
        router.push(`/stock-details/${scrip}`);
    }

    return (
        <>
            <tr className="border-t border-gray-200">
                <th
                    colSpan={5}
                    scope="col"
                    className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-black-800">
                    {title}
                </th>
            </tr>
            {stocks && stocks.map(stock => (
                <Fragment key={stock.scrip}>
                    <tr onClick={() => handleExpandRow(stock.scrip)}>
                        <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm font-medium text-gray-600">
                                {stock.scrip}
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 ">{stock.holdingQuantity}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 ">{stock.currentInvestment}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <div className="text-sm text-gray-900 ">{stock.wacc}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <a href="#" className="text-gray-700" onClick={(e) => viewStock(e, stock.scrip)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </a>
                        </td>
                    </tr>
                    <StockHistoryAggregated expandedRow={expandedRow} stock={stock} />
                </Fragment>
            ))}
        </>
    )
}

export default StockSummary