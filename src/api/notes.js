import axios from 'axios';
import { BASE_API_URL } from '../constants';

const BASE_URL = `${BASE_API_URL}/notes`;

// TODO: Common task, refactor
const fetchNotes = (authState) => {
  const { access_token, client, expiry, uid } = authState;

  return axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      'access-token': access_token,
      client,
      expiry,
      uid
    }
  });
};

export { fetchNotes };