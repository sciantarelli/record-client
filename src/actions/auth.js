import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR, AUTH_UPDATED }from '../constants/actionTypes';


const doAuthUser = (formProps) => ({
  type: AUTH_USER,
  formProps
});

const doAuthSuccess = headers => ({
  type: AUTH_SUCCESS,
  headers
});

const doAuthError = error => ({
  type: AUTH_ERROR,
  error,
});

const doAuthUpdated = headers => ({
  type: AUTH_UPDATED,
  headers
});

export { doAuthUser, doAuthSuccess, doAuthError, doAuthUpdated };