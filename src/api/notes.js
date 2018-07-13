import axios from 'axios';

// TODO: Hardcoded domain, Common task, refactor
const BASE_URL = 'http://localhost:3001/v1/notes';

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