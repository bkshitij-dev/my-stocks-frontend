"use client";

import React, { Fragment } from 'react'
import { useRouter } from 'next/navigation';

import ShareHistoryAggregated from '../share-history-aggregated'

const ShareSummary = (
    { title, scripts, expandedRow, handleExpandRow }:
        { title: string, scripts: ShareDetail[] | null, expandedRow: string | null, handleExpandRow: Function }) => {

    const router = useRouter();

    const viewScript = (e: any, symbol: string) => {
        e.stopPropagation();
        router.push(`/share-details/${symbol}`);
    }

    return (
        // 783,476.3
        <>
            <tr className="border-t border-gray-200">
                <th
                    colSpan={7}
                    scope="col"
                    className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-black-800">
                    {title}
                </th>
            </tr>
            {scripts && scripts.map(script => (
                <Fragment key={script.symbol}>
                    <tr onClick={() => handleExpandRow(script.symbol)}>
                        <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm font-medium text-gray-600">
                                {script.symbol}
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 ">{script.currentQuantity}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 ">{script.currentInvestment}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <div className="text-sm text-gray-900 ">{script.pricePerShare}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <div className="text-sm text-gray-900 ">{script.ltp}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <div className="text-sm text-gray-900 ">{script.target}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <a href="#" className="text-gray-700" onClick={(e) => viewScript(e, script.symbol)}>
                                <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="1.5" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="1.5" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </a>
                        </td>
                    </tr>
                    <ShareHistoryAggregated expandedRow={expandedRow} script={script} />
                </Fragment>
            ))}
        </>
    )
}

export default ShareSummary