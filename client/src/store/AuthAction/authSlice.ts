import { IUser } from './../../types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserLS, login, logout, register } from './authAction';

export interface IInitialStateAuth {
  user: IUser | null;
  isLoading: boolean;
  routes: 'private' | 'public';
}

const initialState: IInitialStateAuth = {
  user: null,
  isLoading: false,
  routes: 'private',
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
        state.routes = 'public';
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
        state.routes = 'public';
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.routes = 'private';
      })
      .addCase(getUserLS.fulfilled, (state, { payload }) => {
        state.user = payload.user = payload.user;
        state.routes = payload.routes;
      });
  },
});
