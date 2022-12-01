import { useActions } from './../hooks/useAction';
import { toastr } from 'react-redux-toastr';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';

const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): error is FetchBaseQueryError => {
  if (error && 'status' in error) return true;
  else return false;
};

export const useListenError = (
  errors: Array<FetchBaseQueryError | SerializedError | undefined>
) => {
  const { toggleRoutes, logout } = useActions();

  useEffect(() => {
    errors.forEach((error) => {
      if (isFetchBaseQueryError(error)) {
        if (error.status === 401) {
          toastr.error('Error', 'Authorization');
          toggleRoutes(true);
          logout();
        } else {
          toastr.error('Error', (error.data as { message: string }).message || 'any error');
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...errors]);
};
