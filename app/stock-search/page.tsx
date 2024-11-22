"use client";

import React, { SyntheticEvent, useState, useEffect } from 'react'
import stockHistoryService from '../services/stockHistoryService';
import { StockData } from '../types/StockData';
import { ApiResponse } from '../types/ApiResponse';
import sectorService from '../services/sectorService';

const StockSearch = () => {

    const [formData, setFormData] = useState<StockSearch>({
        low: 0,
        high: 0,
        sector: undefined
    });
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState("");


    const fetchSectors = async () => {
        try {
          const apiResponse: ApiResponse = await sectorService.list();
          setSectors(apiResponse.data);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        fetchSectors();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      }

    const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSector(e.target.value);
        handleChange(e);
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
          const apiResponse: ApiResponse = await stockHistoryService.searchStocksInPriceRange(formData);
          const result: StockData[] = apiResponse.data;
          setStocks(result); 
        } catch (error) {
         
        }
      };
    
    const getTextColorByPointsChange = (stock: StockData) => {
        if (stock == null) {
            return '';
        }
        return stock.pointsChange > 0 ? 'text-green-500' : stock.pointsChange < 0 ? 'text-red-500' : 'text-blue-500';
    }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-6">Stock Search</h2>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="low" className="block text-sm font-medium text-gray-700 mb-1">Low</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="low"
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="high" className="block text-sm font-medium text-gray-700 mb-1">High</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="high"
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
            <select name="sector" value={selectedSector} onChange={handleSectorChange}>
                <option value="" disabled>Select sector</option>
                {sectors.map((sector) => (
                <option key={sector.id} value={sector.name}>
                    {sector.name}
                </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </form>
      <div className="mt-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 overflow-hidden mt-12">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="w-1/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                <span>S.No.</span>
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Scrip
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                LTP
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Open
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Low
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                High
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Points Change
                                            </th>
                                            <th scope="col" className="w-2/12 px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                                                Percentage Change
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {stocks && stocks.map((stock, idx) => (
                                            <tr key={idx}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="text-sm font-medium text-gray-600">
                                                        {idx + 1}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className={`text-sm ${getTextColorByPointsChange(stock)}`}>{stock.scrip}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className={`text-sm ${getTextColorByPointsChange(stock)}`}>{stock.ltp}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    <div className={`text-sm ${getTextColorByPointsChange(stock)}`}>{stock.open}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    <div className={`text-sm ${getTextColorByPointsChange(stock)}`}>{stock.low}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    <div className={`text-sm ${getTextColorByPointsChange(stock)}`}>{stock.high}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    <div className={`text-sm ${getTextColorByPointsChange(stock)}`}>{stock.pointsChange}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    <div className={`text-sm ${getTextColorByPointsChange(stock)}`}>{stock.percentageChange}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {recentData && (
                    <div className="flex-1 h-[500px]">
                        <AppLineChart data={recentData} min={minValue} max={maxValue} title='Recent Data' />
                    </div>
                )} */}
            </div>
    </div>
  )
}

export default StockSearch