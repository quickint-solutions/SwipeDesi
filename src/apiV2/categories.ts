import axios from 'axios';

export const getCategories = async () => {
  const response = await axios.get('/categories?pageSize=1000');
  return response.data;
};

export const getCategoriesById = async (id: string) => {
  const response = await axios.get(`/categories/${id}`);
  return response.data;
};
