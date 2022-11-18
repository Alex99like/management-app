import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware, MiddlewareAPI } from 'redux';
import { toastError } from './toastrError';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toastError(action.error, 'RTK error');
  }

  return next(action);
};
