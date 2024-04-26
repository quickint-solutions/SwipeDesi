import axios from 'axios';

export const getCategories = async () => {
  const response = await axios.get('/categories');
  console.log('response CALL-> ', response.data);
  return response.data;
};
