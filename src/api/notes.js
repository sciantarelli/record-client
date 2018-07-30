import axios from 'axios';
import { BASE_API_URL } from '../constants';
import { authHeaders } from './index';

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
  return axios({
    ...authHeaders(authState),
    method: 'get',
    url: BASE_URL
  });
};


export { createNote, fetchNote, updateNote, deleteNote, fetchNotes };