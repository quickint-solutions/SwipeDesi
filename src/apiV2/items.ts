import axios from 'axios';

export const getItems = async (params?: any) => {
  const response = await axios.get('/item', {
    params: {
      filter: params.categories ? JSON.stringify({ categories: params.categories }) : '',
    },
  });
  return response.data;
};

export const getFeaturedItems = async () => {
  const response = await axios.get('/item?filter={"featured":true}');
  return response.data;
};

export const getItemsByCategory = async (category_id: string) => {
  const response = await axios.get('/item?filter={"categories":"' + category_id + '"}');
  return response.data;
};

export const getItemsById = async (id: string) => {
  const response = await axios.get(`/item/${id}`);
  return response.data;
};
