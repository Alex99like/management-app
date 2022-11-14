import { rootSlice } from './rootSlice';
import { authSlice } from './AuthAction/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    root: rootSlice.reducer,
    toastr: toastrReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
