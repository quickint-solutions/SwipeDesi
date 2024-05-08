import axios from 'axios';

export const getInstagram = async () => {
  const response = await axios.get(
    'https://graph.instagram.com/me/media?fields=thumbnail_url&access_token=IGQWROWFhXMUdLYWJveUJIV3B1ZAEZAKOGpyQmZAjNHdYSUw2cmxGcVJxcHNJOEpHam1xQ1EtTnpUdmxKSzZA3VVJvTXNLTmdIeTNET1psNG1qN1J0VVROLXl1SmVsVUd4NTFiYXlzSWtOSC0tRTZACTGFxN05HTklPbUUZD',
  );
  return response.data;
};
