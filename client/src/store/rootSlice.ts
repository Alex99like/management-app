import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  modalForm: boolean;
}

const initialState: IInitialState = {
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
