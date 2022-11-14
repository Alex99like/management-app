import { ILoginRes, IRegisterRes } from './../../views/components/Form/form.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from './authAction';

interface IUser {
  token?: string;
  id?: string;
  name?: string;
}

interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: IInitialState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state, { payload }: PayloadAction<ILoginRes>) => {
      state.isLoading = true;
    },
    [login.fulfilled.type]: (state, { payload }: PayloadAction<ILoginRes>) => {
      state.isLoading = false;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<ILoginRes>) => {
      state.isLoading = false;
    },
    [register.pending.type]: (state, { payload }: PayloadAction<IRegisterRes>) => {
      state.isLoading = true;
    },
    [register.fulfilled.type]: (state, { payload }: PayloadAction<IRegisterRes>) => {
      state.isLoading = false;
    },
    [register.rejected.type]: (state, { payload }: PayloadAction<IRegisterRes>) => {
      state.isLoading = false;
    },
  },
});
