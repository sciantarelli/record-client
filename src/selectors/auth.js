const getAuthError = authState =>
    authState.error;

const getIsAuthenticating = authState =>
    authState.isAuthenticating;

const getIsAuthenticated = authState => {
  const { accessToken, client, uid, expiry } = authState;

  return (accessToken && client && uid && expiry) ? true : false;
};

export { getAuthError, getIsAuthenticating, getIsAuthenticated };