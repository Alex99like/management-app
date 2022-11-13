import { createSlice } from '@reduxjs/toolkit';

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
  extraReducers: {},
});
