import axios from 'axios';

export const forgotPasswordAPI = async (body: any) => {
  const email = {
    email: body.email,
  };
  console.log('email -> ', email);
  const response = await axios.post('/auth/sent-reset-password-link', email);
  return response.data;
};
