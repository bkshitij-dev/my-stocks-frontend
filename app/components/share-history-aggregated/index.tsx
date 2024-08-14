import React from 'react'

const ShareHistoryAggregated = ({expandedRow, script}: {expandedRow: string | null, script: ShareDetail}) => {
    return (
        <>
            {expandedRow === script.symbol ? (
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
        </>
    )
}

export default ShareHistoryAggregated