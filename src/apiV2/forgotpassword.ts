import axios from 'axios';

export const forgotPasswordAPI = async (body: any) => {
  console.log('body -> ', body);
  const email = {
    email: body.email,
  };
  const response = await axios.get('/auth/sent-reset-password-link', {
    params: email,
  });
  return response.data;
};
