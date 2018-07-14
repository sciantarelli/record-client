const getAuthError = authState =>
    authState.error;

const getIsAuthenticating = authState =>
    authState.isAuthenticating;

export { getAuthError, getIsAuthenticating };