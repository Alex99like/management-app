import { createSlice } from '@reduxjs/toolkit';

export interface IInitialStateRoot {
  modalForm: boolean;
  lang: 'en' | 'ru';
}

const initialState: IInitialStateRoot = {
  modalForm: false,
  lang: 'en',
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
  },
});
