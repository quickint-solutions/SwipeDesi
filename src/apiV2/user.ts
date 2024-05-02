import axios from 'axios';

export const updateUserAPI = async (data: any) => {
  const updateUserBody = {
    name: {
      first: data.first,
      last: data.last,
    },
    phone: {
      countryCode: data.countryCode,
      number: data.number,
    },
    email: data.email,
    password: data.password,
    address: {
      line1: data.line1,
      line2: data.line2,
      city: data.city,
      state: data.state,
      country: data.country,
      zip: data.zip,
    },
    profileImage: data.profileImage,
  };

  console.log('updateUserBody -> ', updateUserBody);
  const response = await axios.put(`/users/${data.userId}`);
  return response.data;
};
