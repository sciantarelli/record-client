import axios, { CancelToken } from 'axios';
import { BASE_API_URL } from '../constants';
import { authHeaders, cancelable } from './index';

const BASE_URL = `${BASE_API_URL}/notes`;
const baseIdUrl = id => `${BASE_URL}/${id}`;


const createNote = ({ name, content }, authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'post',
    url: BASE_URL,
    data: { name, content }
  })
};


const fetchNote = (id, authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'get',
    url: baseIdUrl(id)
  });
};


const updateNote = ({ id, name, content}, authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'put',
    url: baseIdUrl(id),
    data: { id, name, content }
  });
};


const deleteNote = (id, authState) => {
  return axios({
    ...authHeaders(authState),
    method: 'delete',
    url: baseIdUrl(id)
  });
};


const fetchNotes = (authState) => {
  const request = axios.create({
    ...authHeaders(authState),
    method: 'get',
    url: BASE_URL
  });

  return cancelable(request);
};


export { createNote, fetchNote, updateNote, deleteNote, fetchNotes };