import axios from 'axios';

export const createOrderAPI = async (data: any) => {
  const response = await axios.post(`/order`, data);
  return response.data;
};

export const getOrderAPI = async () => {
  const response = await axios.get(`/order?pageSize=1000`);
  return response.data;
};

export const getOrderById = async (orderId: string) => {
  const response = await axios.get(`/order/${orderId}`);
  return response.data;
};
