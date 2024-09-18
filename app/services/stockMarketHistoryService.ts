import { API_ENDPOINTS } from './api';

const stockMarketHistoryService = {
    getCurrentData: async () => {
      const response = await fetch(`${API_ENDPOINTS.STOCK_MARKET_HISTORY}/current-data`);
      if (!response.ok) {
        console.log('response not ok');
        throw new Error('Network response was not ok');
      }
      return response.json();
    },

    getRecentData: async () => {
      const response = await fetch(`${API_ENDPOINTS.STOCK_MARKET_HISTORY}/recent-data`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },

    getTopMoversData: async (slug: string) => {
      const response = await fetch(`${API_ENDPOINTS.STOCK_MARKET_HISTORY}/top-${slug}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  };
  
export default stockMarketHistoryService;
