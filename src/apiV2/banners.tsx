import axios from 'axios';

export const getBanners = async () => {
  const response = await axios.get('/banners');
  return response.data;
};
