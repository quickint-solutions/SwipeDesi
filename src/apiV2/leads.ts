import axios from 'axios';

export const sendLead = async (body: any) => {
  const response = await axios.post('/send-lead', body);
  return response.data;
};
