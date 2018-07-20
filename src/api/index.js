const authHeaders = authState => {
  const { access_token, client, expiry, uid } = authState;

  return {
    headers: {
      'access-token': access_token,
      client,
      expiry,
      uid
    }
  }
};

export { authHeaders };