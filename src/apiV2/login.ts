import axios from 'axios';

export const login = async (body: any) => {
  const loginBody = {
    email: body.email,
    password: body.password,
  };

  console.log('loginBody -> ', loginBody);

  const response = await axios.post('/auth/login', loginBody);
  return response.data;
};
