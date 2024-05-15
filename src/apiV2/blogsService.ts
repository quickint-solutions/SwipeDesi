import axios from 'axios';

export const blogService = async (params?: any) => {
  const response = await axios.get('/blogs', {
    params: {
      searchFields: 'title',
      search: params.search,
      pageSize: 1000,
      filter: params.categories
        ? JSON.stringify({
            categories: params.categories,
          })
        : null,
    },
  });
  return response.data;
};

export const getFeaturedItems = async () => {
  const response = await axios.get('/blogs?filter={"featured":true}');
  return response.data;
};
console.log('getFeaturedItems -> ', getFeaturedItems);

export const getBlogsById = async (id: string) => {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
};

export const getBlogsByCategory = async (category_id: string) => {
  const response = await axios.get('/blogs?filter={"categories":"' + category_id + '"}');
  return response.data;
};
