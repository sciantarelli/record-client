import { DISPATCH_THEN_ROUTE } from '../constants/actionTypes';

const doDispatchThenRoute = (actions, path, replaceId=false) => {
  if (!Array.isArray(actions)) actions = [actions];

  return {
    type: DISPATCH_THEN_ROUTE,
    actions,
    path,
    replaceId
  };
};

export { doDispatchThenRoute };