import { API_ENDPOINTS } from './api';

const stockHistoryService = {
    getRecentDataForScrip: async (scrip: string) => {
      const response = await fetch(`${API_ENDPOINTS.STOCK_HISTORY}/scrip/${scrip}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    searchStocksInPriceRange: async (formData: StockSearch) => {
      const response = await fetch(`${API_ENDPOINTS.STOCK_HISTORY}/in-price-range?low=${formData.low}&high=${formData.high}`);
      if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      return response.json();
    }
  };
  
export default stockHistoryService;
