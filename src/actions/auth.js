import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR, AUTH_UPDATED, AUTH_DESTROY }from '../constants/actionTypes';

import { deletePropertyFromObject } from '../helpers';


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

const doAuthUpdated = headers => {
  const accessToken = headers['access-token'];
  const cleanedHeaders =
      deletePropertyFromObject(headers, 'access-token');


  return {
    type: AUTH_UPDATED,
    headers: {
      ...cleanedHeaders,
      accessToken
    }
  }
};

const doLogoutUser = () => ({
  type: AUTH_DESTROY
});

export { doAuthUser, doAuthSuccess, doAuthError, doAuthUpdated, doLogoutUser };