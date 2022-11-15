import { IUser } from './../../types/user.type';
import { toastError } from './../../utils/toastrError';
import { IRegister } from './../../views/components/Form/form.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth/AuthService';
import { toastr } from 'react-redux-toastr';
import { REHYDRATE, getStoredState } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';

export const register = createAsyncThunk<IUser, IRegister>(
  'auth/register',
  async ({ login, password, name }, thunkApi) => {
    try {
      const response = await AuthService.register(login, name, password);
      toastr.success('Registration', 'Completed successfully');
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
      toastr.success('Login', 'Completed successfully');
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void>('auth/logout', async () => {
  AuthService.logout();
  toastr.warning('Logout', 'You have logged out of your account');
});

export const getUserLS = createAsyncThunk(REHYDRATE, async () => {
  const user = (await getStoredState({ key: 'user', storage })) as {
    user: IUser;
    routes: 'private' | 'public';
  };

  return user;
});
