import axios from 'axios';
import { BASE_API_URL } from '../constants';

const BASE_URL = `${BASE_API_URL}/notes`;

const fetchNote = (id, authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'get',
    url: `${BASE_URL}/${id}`
  });
};

const updateNote = ({ id, name, content}, authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'put',
    url: `${BASE_URL}/${id}`,
    data: {
      id, name, content
    }
  });
};

const fetchNotes = (authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'get',
    url: BASE_URL
  });
};

// TODO: Common need, refactor
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



export { fetchNote, updateNote, fetchNotes };