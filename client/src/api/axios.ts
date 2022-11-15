import axios from 'axios';
import { getContentType } from '../utils/api.utils';

export const API_URL = `http://localhost:4200`;
//export const API_URL = 'https://managment-5rt6.onrender.com';

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});
