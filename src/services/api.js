import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '28265078-0316afef2c157389b1fbaa4c7';
const BASE_FILTERS = 'image_type=photo&orientation=horizontal&per_page=12';

export const getImagesAPI = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&${BASE_FILTERS}`
  );
  const images = response.data.hits.map(img => {
    const { id, largeImageURL, webformatURL, tags } = img;
    return {
      id,
      largeImageURL,
      webformatURL,
      tags,
    };
  });
  return images;
};
