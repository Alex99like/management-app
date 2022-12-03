import { IUser } from './../../types/user.type';
import { toastError } from './../../utils/toastrError';
import { IRegister } from './../../views/components/Form/form.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth/AuthService';
import { toastr } from 'react-redux-toastr';
import { REHYDRATE, getStoredState } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { useTranslation } from 'react-i18next';

export const register = createAsyncThunk<IUser, IRegister>(
  'auth/register',
  async ({ login, password, name }, thunkApi) => {
    try {
      const response = await AuthService.register(login, name, password);
      const { t } = useTranslation();
      toastr.success(t('toastr.authAction.registration'), t('toastr.authAction.completed'));
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
      const { t } = useTranslation();
      toastr.success(t('toastr.authAction.login'), t('toastr.authAction.completed'));
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<Omit<IUser, 'token'>, IRegister & { id: string }>(
  'users/update',
  async ({ login, password, name, id }, thunkApi) => {
    try {
      const response = await AuthService.update(login, name, password, id);
      const { t } = useTranslation();
      toastr.success(t('toastr.authAction.update'), t('toastr.authAction.completed'));
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk<void, { id: string }>(
  'users/delete',
  async ({ id }, thunkApi) => {
    try {
      await AuthService.delete(id);
      const { t } = useTranslation();
      toastr.success(t('toastr.authAction.delete'), t('toastr.authAction.completed'));
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void>('auth/logout', async () => {
  const { t } = useTranslation();
  toastr.warning(t('toastr.authAction.logout'), t('toastr.authAction.loggedOut'));
});

export const getUserLS = createAsyncThunk(REHYDRATE, async () => {
  const user = (await getStoredState({ key: 'user', storage })) as {
    user: IUser;
    routes: 'private' | 'public';
  };

  return user;
});
