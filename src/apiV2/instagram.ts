import axios from 'axios';

export const getInstagram = async () => {
  const response = await axios.get(
    `https://graph.instagram.com/me/media?fields=thumbnail_url&access_token=${process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN}`,
  );
  return response.data;
};
