import axios from 'axios';
import { IUser } from '../types/user.type';
import { getContentType } from '../utils/api.utils';

//export const API_URL = `http://localhost:4200`;
export const API_URL = 'https://managment-5rt6.onrender.com';

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

axiosClassic.interceptors.request.use((config) => {
  const accessToken =
    (
      JSON.parse(
        (JSON.parse(localStorage.getItem('persist:user')!) as { user: string }).user
      ) as IUser
    ).token ?? '';
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
