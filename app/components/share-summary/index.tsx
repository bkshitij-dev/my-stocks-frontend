import React, { Fragment } from 'react'

import ShareHistoryAggregated from '../share-history-aggregated'

const ShareSummary = (
    { title, scripts, expandedRow, handleExpandRow }:
        { title: string, scripts: ShareDetail[] | null, expandedRow: string | null, handleExpandRow: Function }) => {
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
            {scripts && scripts.map(script => (
                <Fragment key={script.symbol}>
                    <tr onClick={() => handleExpandRow(script.symbol)}>
                        <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm font-medium text-gray-600">
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
                    <ShareHistoryAggregated expandedRow={expandedRow} script={script} />
                </Fragment>
            ))}
        </>
    )
}

export default ShareSummary