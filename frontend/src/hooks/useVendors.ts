import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const useVendors = (category?: string) => {
  return useQuery({
    queryKey: ['vendors', category],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/v1/vendors/`, {
        params: { category }
      });
      return response.data;
    }
  });
};

export const useVendorDetail = (id: string) => {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/v1/vendors/${id}`);
      return response.data;
    }
  });
};
