import { API_ENDPOINTS } from './api';

const stockTransactionService = {
    getTransactions: async (scrip: string) => {
        const response = await fetch(`${API_ENDPOINTS.STOCK_TRANSACTION}/stocks/${scrip}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },
    postTransaction: async (formData: StockTransaction) => {
        const response = await fetch("http://localhost:8080/api/v1/stock-transactions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        return response
    }
};

export default stockTransactionService;