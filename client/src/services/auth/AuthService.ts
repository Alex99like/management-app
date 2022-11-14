import { IUser } from './../../types/user.type';
import { axiosClassic } from '../../api/axios';

export const AuthService = {
  async register(login: string, name: string, password: string) {
    const response = await axiosClassic.post<IUser>(`/signup`, {
      name,
      login,
      password,
    });

    return response;
  },

  async login(login: string, password: string) {
    const response = await axiosClassic.post<IUser>(`/signin`, {
      login,
      password,
    });

    return response;
  },
};
