import { API_ENDPOINTS } from './api';

const stockHoldingService = {
    getStockHoldings: async () => {
      const response = await fetch(API_ENDPOINTS.STOCK_HOLDING);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  };
  
export default stockHoldingService;
