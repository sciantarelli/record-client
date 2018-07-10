import { AUTH_USER, AUTH_SUCCESS, AUTH_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  authenticated: '',
  error: '',
  isAuthenticating: false
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
      return {
        ...state,
        authenticated: action.data.user.authentication_token,
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
