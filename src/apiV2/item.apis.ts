import axios from 'axios';

export const fetchItems = async () => {
  const response = await axios.get('/items');
  return response.data;
};
