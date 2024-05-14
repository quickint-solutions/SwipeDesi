import axios from 'axios';

export const getInstagram = async () => {
  const response = await axios.get(
    'https://graph.instagram.com/me/media?fields=thumbnail_url&access_token=IGQWROSFgyLUhJcUZAyeTc4R1E1aksydkxHRGF4bVRaXzZAmeGxObXdraU1iV1dfZAmdMWVpwMldWSXFFaWdibkZAYZAE5qd3FKQ1dyT1F4b0ttQ19ET3BpNzRlZAjZAYLU51MVlMeEZAuOW9RVnhGdUEzOUI3ZAWF5UGxORWsZD',
  );
  return response.data;
};
