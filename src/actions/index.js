import axios from 'axios';

import { FETCH_NEWS } from './types';

const API_URL = 'https://www.cah.ucf.edu/wp-json/wp/v2/news';

export function fetchNews() {
  return {
    type: FETCH_NEWS,
    payload: axios.get(API_URL)
  };
}
