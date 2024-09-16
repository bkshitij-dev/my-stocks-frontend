import React from 'react'
import Link from 'next/link'
import { StockData } from '@/app/types/StockData'


const LatestStockData = ({stock}: {stock: StockData}) => {
  const tdCss = "whitespace-nowrap px-4 py-4";

  let indicatorColor = "text-blue-500";
  if (stock.pointsChange > 0) {
    indicatorColor = "text-green-500";
  } else if (stock.pointsChange < 0) {
    indicatorColor = "text-red-500";
  }

  const divCss = `text-sm font-medium ${indicatorColor}`;

  return (
    <tr key={stock.scrip}>
      <td className={tdCss}>
        <div className={divCss}>
          <Link href={`/stock-details/${stock.scrip}`}>{stock.scrip}</Link>
        </div>
      </td>
      <td className={tdCss}>
        <div className={divCss}>{stock.ltp}</div>
      </td>
      <td className={tdCss}>
        <div className={divCss}>{stock.pointsChange}</div>
      </td>
      <td className={tdCss}>
        <div className={divCss}>{stock.percentageChange}</div>
      </td>
      <td className={tdCss}>
        <div className={divCss}>{stock.open}</div>
      </td>
      <td className={tdCss}>
        <div className={divCss}>{stock.high}</div>
      </td>
      <td className={tdCss}>
        <div className={divCss}>{stock.low}</div>
      </td>
    </tr>
  )
}

export default LatestStockData