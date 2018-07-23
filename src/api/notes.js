import axios from 'axios';
import { BASE_API_URL } from '../constants';
import { authHeaders } from './index';

const BASE_URL = `${BASE_API_URL}/notes`;

const createNote = ({ name, content }, authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'post',
    url: `${BASE_URL}`,
    data: { name, content }
  })
};

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


export { createNote, fetchNote, updateNote, fetchNotes };