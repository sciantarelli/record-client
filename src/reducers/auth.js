import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR } from '../constants/actionTypes';

const errorDefault = () => null;
const isAuthenticatingDefault = () => false;
const accessTokenDefault = () => '';
const clientDefault = () => '';
const expiryDefault = () => '';
const uidDefault = () => '';


export const INITIAL_STATE = {
  error: errorDefault(),
  isAuthenticating: isAuthenticatingDefault(),
  accessToken: accessTokenDefault(),
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
      const { accessToken, client, expiry, uid } = action.headers;

      return {
        ...state,
        accessToken,
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
