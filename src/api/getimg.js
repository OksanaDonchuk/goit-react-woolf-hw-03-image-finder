import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const API_KEY = '37918988-e3d1c8b61b1090de1ebde83c0';

export const getImagesApi = async (query, page, limit) => {
  const { data } = await axios(
    `${baseURL}?key=${API_KEY}&q=${query}&image_type=photo&page=${page}&orientation=horizontal&per_page=${limit}`
  );
  return data;
};
