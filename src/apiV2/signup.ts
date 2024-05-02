import axios from 'axios';

export const signup = async (body: any) => {
  const signupBody = {
    name: {
      first: body.first,
      last: body.last,
    },
    phone: {
      countryCode: body.countryCode,
      number: body.number,
    },
    email: body.email,
    password: body.password,
    address: {
      line1: body.line1,
      line2: body.line2,
      city: body.city,
      state: body.state,
      country: body.country,
      zip: body.zip,
    },
    profileImage: body.profileImage,
  };
  const response = await axios.post('/auth/signup', signupBody);
  return response.data;
};
