import axios from 'axios';

export const resetPasswordAPI = async (body: any) => {
  const resetPasswordBody = {
    verificationCode: body.otp,
    password: body.password2,
  };

  console.log('resetPasswordBody -> ', resetPasswordBody);
  const response = await axios.post('/auth/reset-password', resetPasswordBody);
  return response.data;
};