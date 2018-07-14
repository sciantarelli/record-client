import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR } from '../constants/actionTypes';

const errorDefault = () => null;
const isAuthenticatingDefault = () => false;
const accessTokenDefault = () => '';
const clientDefault = () => '';
const expiryDefault = () => '';
const uidDefault = () => '';


const INITIAL_STATE = {
  error: errorDefault(),
  isAuthenticating: isAuthenticatingDefault(),
  access_token: accessTokenDefault(),
  client: clientDefault(),
  expiry: expiryDefault(),
  uid: uidDefault()
};


export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticating: true,
        error: errorDefault()
      };
    case AUTH_SUCCESS:
      const headers = action.headers;
      const { client, expiry, uid } = headers;

      return {
        ...state,
        access_token: headers['access-token'],
        client,
        expiry,
        uid,
        isAuthenticating: isAuthenticatingDefault()
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        isAuthenticating: isAuthenticatingDefault()
      };
    default:
      return state;
  }
}
