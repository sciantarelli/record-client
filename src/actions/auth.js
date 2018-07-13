import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR, AUTH_UPDATED }from '../constants/actionTypes';


const authUser = (formProps) => ({
  type: AUTH_USER,
  formProps
});

const authSuccess = headers => ({
  type: AUTH_SUCCESS,
  headers
});

const authError = error => ({
  type: AUTH_ERROR,
  error,
});

const authUpdated = headers => ({
  type: AUTH_UPDATED,
  headers
});

export { authUser, authSuccess, authError, authUpdated };