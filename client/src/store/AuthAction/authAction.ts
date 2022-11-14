import { toastError } from './../../utils/toastrError';
import {
  IRegister,
  IRegisterRes,
  ILogin,
  ILoginRes,
} from './../../views/components/Form/form.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth/AuthService';
import { toastr } from 'react-redux-toastr';
import { useActions } from '../../hooks/useAction';

export const register = createAsyncThunk<IRegisterRes, IRegister>(
  'auth/register',
  async ({ login, password, name }, thunkApi) => {
    try {
      const response = await AuthService.register(login, name, password);
      toastr.success('Registration', 'Completed successfully');
      //callModal();
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<ILoginRes, ILogin>(
  'auth/register',
  async ({ login, password }, thunkApi) => {
    // const { callModal } = useActions();
    try {
      const response = await AuthService.login(login, password);
      toastr.success('Login', 'Completed successfully');
      //callModal();
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
