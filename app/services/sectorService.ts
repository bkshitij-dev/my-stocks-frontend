import { API_ENDPOINTS } from './api';

const sectorService = {
    list: async () => {
      const response = await fetch(API_ENDPOINTS.SECTOR);
      if (!response.ok) {
        console.log('response not ok');
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  };
  
export default sectorService;