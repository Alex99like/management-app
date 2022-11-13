import {
  IRegister,
  IRegisterRes,
  ILogin,
  ILoginRes,
} from './../../views/components/Form/form.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth/AuthService';

export const register = createAsyncThunk<IRegisterRes, IRegister>(
  'auth/register',
  async ({ login, password, name }, thunkApi) => {
    try {
      const response = await AuthService.register(login, name, password);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<ILoginRes, ILogin>(
  'auth/register',
  async ({ login, password }, thunkApi) => {
    try {
      const response = await AuthService.login(login, password);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
