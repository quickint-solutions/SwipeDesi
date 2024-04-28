import axios from 'axios';

export const createPaymentIntent = async (body: any) => {
  const response = await axios.post('/stripe/create-session', body);
  return response.data;
};
