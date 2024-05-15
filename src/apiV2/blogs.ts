import axios from 'axios';

export const fetchBlogs = async () => {
  const response = await axios.get('/blogs');
  return response.data;
};

export const getBlogsById = async (id: string) => {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
};
