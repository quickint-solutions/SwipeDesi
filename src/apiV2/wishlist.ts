import axios from 'axios';

export const addWishList = async (data: any) => {
  const newData = {
    user: data.userId,
    item: data.productId,
  };
  const response = await axios.post(`/wishlist`, newData);
  return response.data;
};

export const getWishList = async () => {
  const response = await axios.get(`/wishlist/`);
  return response.data;
};
