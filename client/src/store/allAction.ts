import * as AuthAction from './AuthAction/authAction';
import { rootSlice } from './rootSlice';

export const allActions = {
  ...AuthAction,
  ...rootSlice.actions,
};
