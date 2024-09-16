import { API_ENDPOINTS } from './api';

const companyService = {
    getCompanies: async () => {
      const response = await fetch(API_ENDPOINTS.COMPANY);
      if (!response.ok) {
        console.log('response not ok');
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  };
  
export default companyService;
