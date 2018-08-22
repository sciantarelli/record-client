const authHeaders = authState => {
  const { accessToken, client, expiry, uid } = authState;

  return {
    headers: {
      accessToken,
      client,
      expiry,
      uid
    }
  }
};

export { authHeaders };