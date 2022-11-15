import { IUser } from './../../types/user.type';
import { toastError } from './../../utils/toastrError';
import { IRegister } from './../../views/components/Form/form.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth/AuthService';
import { toastr } from 'react-redux-toastr';
import Cookies from 'cookies-js';
import { NavigateFunction } from 'react-router-dom';

export const register = createAsyncThunk<IUser, IRegister & { navigate: NavigateFunction }>(
  'auth/register',
  async ({ login, password, name, navigate }, thunkApi) => {
    try {
      const response = await AuthService.register(login, name, password);
      toastr.success('Registration', 'Completed successfully');
      navigate('/');
      Cookies.set('user-v-21', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IUser, IRegister & { navigate: NavigateFunction }>(
  'auth/login',
  async ({ login, password, navigate }, thunkApi) => {
    try {
      const response = await AuthService.login(login, password);
      navigate('/');
      Cookies.set('user-v-21', JSON.stringify(response.data));
      toastr.success('Login', 'Completed successfully');
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void, { navigate: NavigateFunction }>(
  'auth/logout',
  async ({ navigate }) => {
    navigate('/');
    AuthService.logout();
    toastr.warning('Logout', 'You have logged out of your account');
  }
);
