import { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';

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


const cancelable = (axiosInstance) => {
  const source = CancelToken.source();

  const config = {
    cancelToken: source.token
  };

  const request = axiosInstance.request(config);

  request[CANCEL] = () => source.cancel();

  return request;
};


export { authHeaders, cancelable };