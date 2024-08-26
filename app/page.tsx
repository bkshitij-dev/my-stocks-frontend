"use client";

import { SyntheticEvent, useState } from "react";
import TypeaheadDropdown from "./components/typeahead-dropdown";
import toast from "react-hot-toast";
import ToastContent from "./components/toast-content";

export default function Home() {

  const [formData, setFormData] = useState<StockTransaction>({
    companyId: 0,
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

  const resetForm = () => {
    setFormData({
      companyId: 0,
      transactionType: "BUY",
      stockType: "IPO",
      quantity: 0,
      rate: 0
    });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // try {
    //   const response = await fetch("http://localhost:8080/api/v1/stock-transactions123", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   toast.success("Transaction added successfully!");
    //   setSubmitted(true);
    //   resetForm();

    // } catch (error) {
    //   toast.custom((t) => (
    //     <div
    //       className={`${
    //         t.visible ? 'animate-enter' : 'animate-leave'
    //       } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //     >
    //       <div className="flex-1 w-0 p-4">
    //         <div className="flex items-start">
    //           <div className="flex-shrink-0 pt-0.5">
    //             <img
    //               className="h-10 w-10 rounded-full"
    //               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
    //               alt=""
    //             />
    //           </div>
    //           <div className="ml-3 flex-1">
    //             <p className="text-sm font-medium text-gray-900">
    //               Emilia Gates
    //             </p>
    //             <p className="mt-1 text-sm text-gray-500">
    //               Sure! 8:30pm works great!
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex border-l border-gray-200">
    //         <button
    //           onClick={() => toast.dismiss(t.id)}
    //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   ))
    // }

    // Log message once

    toast.custom((t) => (
      <>
      {console.log("Hello")}
      <ToastContent onClose={() => toast.dismiss(t.id)} />
      </>
    ));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-6">Add New Transaction</h2>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Scrip</label>
            <TypeaheadDropdown value={formData.companyId}
              callback={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}>
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="stockType" className="block text-sm font-medium text-gray-700 mb-1">Share Type</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="stockType"
              value={formData.stockType}
              onChange={handleChange}>
              <option value="IPO">IPO</option>
              <option value="SECONDARY">Secondary</option>
              <option value="RIGHT">Right</option>
              <option value="BONUS">Bonus</option>
              <option value="MERGER">Merger</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="rate"
              onChange={handleRateChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
