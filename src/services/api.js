import axios from 'axios';

const API_KEY = '28265078-0316afef2c157389b1fbaa4c7';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const PARAM =
  'per_page=12&orientation=horizontal&image_type=photo&safesearch=true';

const getImagesAPI = async (searchQuery, page) => {
  const { data } = await axios.get(
    `/?&key=${API_KEY}q=${searchQuery}&page=${page}&${PARAM}`
  );

  return data;
};

export { getImagesAPI };
