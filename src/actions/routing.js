import { DISPATCH_THEN_ROUTE } from '../constants/actionTypes';

const doDispatchThenRoute = (action, path) => ({
  type: DISPATCH_THEN_ROUTE,
  action,
  path
});

export { doDispatchThenRoute };