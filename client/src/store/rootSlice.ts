import { createSlice } from '@reduxjs/toolkit';

export interface IInitialStateRoot {
  lang: 'en' | 'ru';
  theme: 'light' | 'dark';
  boardId: string;
}

const initialState: IInitialStateRoot = {
  lang: 'en',
  theme: 'light',
  boardId: '',
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    changeLang: (state, { payload }) => {
      state.lang = payload;
    },
    changeTheme: (state, { payload }) => {
      state.theme = payload;
    },
    setBoardId: (state, { payload }) => {
      state.boardId = payload;
    },
  },
});
