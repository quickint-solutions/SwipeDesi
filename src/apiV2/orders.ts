import axios from 'axios';

export const createOrderAPI = async (data: any) => {
  const response = await axios.post(`/order`, data);
  return response.data;
};
