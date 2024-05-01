import axios from 'axios';

export const getCategories = async () => {
  const response = await axios.get('/categories?pageSize=1000');
  return response.data;
};
