import { IUser } from './../../types/user.type';
import { toastError } from './../../utils/toastrError';
import { IRegister } from './../../views/components/Form/form.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth/AuthService';
import { toastr } from 'react-redux-toastr';
import Cookies from 'cookies-js';

export const register = createAsyncThunk<IUser, IRegister>(
  'auth/register',
  async ({ login, password, name }, thunkApi) => {
    try {
      const response = await AuthService.register(login, name, password);
      toastr.success('Registration', 'Completed successfully');
      Cookies.set('user-v-21', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IUser, IRegister>(
  'auth/login',
  async ({ login, password }, thunkApi) => {
    try {
      const response = await AuthService.login(login, password);
      Cookies.set('user-v-21', JSON.stringify(response.data));
      toastr.success('Login', 'Completed successfully');
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
