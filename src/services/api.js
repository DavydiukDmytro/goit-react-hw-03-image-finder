import axios from 'axios';

const KEY = '34428606-d91e465e278c258cee6249ca4';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export const getImages = async (searchWord, page) => {
  const response = await axios.get(`&q=${searchWord}&page=${page}`);
  return response.data;
};
