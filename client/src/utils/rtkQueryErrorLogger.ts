import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { Middleware, MiddlewareAPI } from 'redux';
import { toastError } from './toastrError';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  const { t } = useTranslation();
  if (isRejectedWithValue(action)) {
    toastError(action.error, t('toastr.rtkError') as string);
  }

  return next(action);
};
