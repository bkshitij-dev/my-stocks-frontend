import React from 'react'

const StockHistoryAggregated = ({expandedRow, stock}: {expandedRow: string | null, stock: StockDetail}) => {
    return (
        <>
            {expandedRow === stock.scrip ? (
                <tr key={`${stock.scrip}-expand`} className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500">
                    <td colSpan={5} className="collaps-viewer">
                        <div className="flex space-x-6 pl-4 py-4">
                            <div className="flex-1">
                                <div className="font-semibold">Total Buy Quantity</div>
                                <div className="text-sm text-gray-900">{stock.totalBuyQuantity}</div>
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold">Total Sell Quantity</div>
                                <div className="text-sm text-gray-900">{stock.totalSellQuantity}</div>
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold">Total Buy Amount</div>
                                <div className="text-sm text-gray-900">{stock.totalBuyAmount}</div>
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold">Total Sell Amount</div>
                                <div className="text-sm text-gray-900">{stock.totalSellAmount}</div>
                            </div>
                        </div>
                    </td>
                </tr>
            ) : null}
        </>
    )
}

export default StockHistoryAggregated