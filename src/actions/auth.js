import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR }from '../constants/actionTypes';


const authUser = (formProps) => ({
  type: AUTH_USER,
  formProps
});

const authSuccess = data => ({
  type: AUTH_SUCCESS,
  data
});

const authError = error => ({
  type: AUTH_ERROR,
  error,
});

export { authUser, authSuccess, authError };