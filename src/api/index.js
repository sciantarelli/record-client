const authHeaders = authState => {
  const { accessToken, client, expiry, uid } = authState;

  return {
    headers: {
      'access-token': accessToken,
      client,
      expiry,
      uid
    }
  }
};

export { authHeaders };