import { ILoginRes, IRegisterRes } from './../../views/components/Form/form.interface';
import { axiosClassic } from '../../api/axios';

export const AuthService = {
  async register(login: string, name: string, password: string) {
    const response = await axiosClassic.post<IRegisterRes>(`/signup`, {
      name,
      login,
      password,
    });

    return response;
  },

  async login(login: string, password: string) {
    const response = await axiosClassic.post<ILoginRes>(`/signin`, {
      login,
      password,
    });

    return response;
  },
};
