import axios from 'axios';

export const fetch = async (params: any) => {
  const response = await axios.get('/api/items', { params });

  return response.data;
};
