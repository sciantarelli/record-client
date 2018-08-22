import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR, AUTH_UPDATED, AUTH_DESTROY }from '../constants/actionTypes';

import { deletePropertyFromObject } from '../helpers';


const doAuthUser = (formProps) => ({
  type: AUTH_USER,
  formProps
});

const doAuthSuccess = headers => ({
  type: AUTH_SUCCESS,
  headers: cleanHeaders(headers)
});

const doAuthError = error => ({
  type: AUTH_ERROR,
  error,
});

const doAuthUpdated = headers => ({
  type: AUTH_UPDATED,
  headers: cleanHeaders(headers)
});

const doLogoutUser = () => ({
  type: AUTH_DESTROY
});


const cleanHeaders = (headers) => {
  if (!headers.hasOwnProperty('access-token')) {
    return headers;
  }

  const accessToken = headers['access-token'];
  const cleanedHeaders =
      deletePropertyFromObject(headers, 'access-token');

  return {
    ...cleanedHeaders,
    accessToken
  };
};

export { doAuthUser, doAuthSuccess, doAuthError, doAuthUpdated, doLogoutUser };