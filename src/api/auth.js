// TODO: Refactor common axios into config type setup
import axios from 'axios';
import { BASE_API_URL } from '../constants';
import { authHeaders } from './index';

const BASE_URL = `${BASE_API_URL}/auth`;

const postAuthUser = ({ email='', password=''}) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}/sign_in`,
    data: {
      email,
      password
    }
  });
};

const deleteAuthUser = authState => {
  return axios({
    ...authHeaders(authState),
    method: 'delete',
    url: `${BASE_URL}/sign_out`
  })
};

export { postAuthUser, deleteAuthUser };