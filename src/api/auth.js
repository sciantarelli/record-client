// TODO: Refactor common axios into config type setup
import axios from 'axios';
import { BASE_API_URL } from '../constants';
import { authHeaders, cancelable } from './index';

const BASE_URL = `${BASE_API_URL}/auth`;


const postAuthUser = ({ email='', password=''}) => {
  const request = axios.create({
    method: 'post',
    url: `${BASE_URL}/sign_in`,
    data: {
      email,
      password
    }
  });

  return cancelable(request);
};


const deleteAuthUser = authState => {
  const request = axios.create({
    ...authHeaders(authState),
    method: 'delete',
    url: `${BASE_URL}/sign_out`
  });

  return cancelable(request);
};

export { postAuthUser, deleteAuthUser };