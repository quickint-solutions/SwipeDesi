import axios from 'axios';

export const addWishList = async (data: any) => {
  const newData = {
    user: data.userId,
    item: data.productId,
  };
  const response = await axios.post(`/wishlist`, newData);
  return response.data;
};
