const getAuthError = authState =>
    authState.error;

const getIsAuthenticating = authState =>
    authState.isAuthenticating;

const getIsAuthenticated = authState => {
  const { access_token, client, uid, expiry } = authState;

  return (access_token && client && uid && expiry) ? true : false;
};

export { getAuthError, getIsAuthenticating, getIsAuthenticated };