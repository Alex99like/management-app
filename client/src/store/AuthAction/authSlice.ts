import { IUser } from './../../types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, register } from './authAction';
import Cookies from 'cookies-js';

interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: IInitialState = {
  user: Cookies.get('user-v-21') ? JSON.parse(Cookies.get('user-v-21')) : null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});
