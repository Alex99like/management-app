import { createSlice } from '@reduxjs/toolkit';

export interface IInitialStateRoot {
  modalForm: boolean;
  lang: 'en' | 'ru';
  theme: 'light' | 'dark';
}

const initialState: IInitialStateRoot = {
  modalForm: false,
  lang: 'en',
  theme: 'light',
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    callModal: (state) => {
      state.modalForm = !state.modalForm;
    },
    changeLang: (state, { payload }) => {
      state.lang = payload;
    },
    changeTheme: (state, { payload }) => {
      state.theme = payload;
    },
  },
});
