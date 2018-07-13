import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  authenticated: '',
  error: '',
  isAuthenticating: false,
  access_token: '',
  client: '',
  expiry: '',
  uid: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticating: true,
        error: ''
      };
    case AUTH_SUCCESS:
      const headers = action.headers;
      const { client, expiry, uid } = headers;

      return {
        ...state,
        authenticated: '', // TODO: Remove this, originally from action.data.user.authentication_token,
        access_token: headers['access-token'],
        client,
        expiry,
        uid,
        isAuthenticating: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        isAuthenticating: false
      };
    default:
      return state;
  }
}
