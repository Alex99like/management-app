import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

export type TypeRootState = ReturnType<typeof store.getState>;
