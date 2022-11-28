import { createSlice } from '@reduxjs/toolkit';

export interface IInitialStateRoot {
  lang: 'en' | 'ru';
  theme: 'light' | 'dark';
  boardId: string;
  initialData: initialData;
}

const initialState: IInitialStateRoot = {
  lang: 'en',
  theme: 'light',
  boardId: '',
  initialData: {
    columns: {},
  },
};

interface initialData {
  columns: {
    [key: string]: Record<string, string | number | Record<string, string | number | []>[]>;
  };
}

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
    setData: (state, { payload }) => {
      state.initialData = {
        columns: {
          ...state.initialData.columns,
          [payload.id as keyof typeof payload]: {
            id: payload.id,
            title: payload.title,
            order: payload.tasks,
            columnOrder: payload.order,
          },
        },
      };
    },
  },
});
