export const attachPathNameToAction = store => next => action=> {
  const router = store.getState().router;

  action.pathname = router.location && router.location.pathname;
  next(action)
};