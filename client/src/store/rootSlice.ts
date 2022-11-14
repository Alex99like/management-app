import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalForm: false,
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    callModal: (state) => {
      state.modalForm = !state.modalForm;
    },
  },
});

export const { callModal } = rootSlice.actions;
