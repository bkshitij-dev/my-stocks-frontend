"use client";

import { SyntheticEvent, useState } from "react";

export default function Home() {

  const [formData, setFormData] = useState<StockTransaction>({
    scrip: '',
    transactionType: "BUY",
    stockType: "IPO",
    quantity: 0,
    rate: 0 
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      handleChange(e);
    }
  }

  const handleSubmit = async(e: SyntheticEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8080/api/v1/stock-transactions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    setSubmitted(true);
    setFormData({
      scrip: '',
      transactionType: "BUY",
      stockType: "IPO",
      quantity: 0,
      rate: 0 
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{submitted &&
        <> 
        <span>"Transaction Added"</span>
        <span onClick={() => setSubmitted(false)}>x</span>
        </>
        }
      </div>
      <h1 className="text-4xl font-bold">Add Transaction</h1>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <label className="text-xl font-bold">Name</label>
        <input
          className="border-2 border-gray-400 rounded-lg p-2 m-2"
          type="text"
          name="scrip"
          value={formData.scrip}
          placeholder='Enter the script symbol'
          onChange={handleChange}
        />
        <label className="text-xl font-bold">Transaction Type</label>
        <select className="border-2 border-gray-400 rounded-lg p-2 m-2" 
                name="transactionType"
                value={formData.transactionType} 
                onChange={handleChange}>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
        <label className="text-xl font-bold">Share Type</label>
        <select className="border-2 border-gray-400 rounded-lg p-2 m-2" 
                name="stockType"
                value={formData.stockType} 
                onChange={handleChange}>
          <option value="IPO">IPO</option>
          <option value="SECONDARY">Secondary</option>
          <option value="RIGHT">Right</option>
          <option value="BONUS">Bonus</option>
          <option value="MERGER">Merger</option>
        </select>
        <label className="text-xl font-bold">Quantity</label>
        <input
          className="border-2 border-gray-400 rounded-lg p-2 m-2"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <label className="text-xl font-bold">Rate</label>
        <input
          className="border-2 border-gray-400 rounded-lg p-2 m-2"
          type="text"
          name="rate"
          onChange={handleRateChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
      </form>
    </main>
  );
}
