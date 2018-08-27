import axios from 'axios';
import { t, ClientFunction } from 'testcafe';
import { LOGOUT_PATH } from '../../../constants';
import config from './config';


const reseed = () => async ctx => {
  await axios({method: 'get', url: `${config.api_host}${config.api_reseed_path}`});
};

const login = async (email='test@test.com', password='password') => {
  await t
      .typeText('form input[name=email]', email)
      .typeText('form input[name=password', password)
      .click('form button');
};

const logout = async () => {
  await t.click(`#main-nav a[href="${LOGOUT_PATH}"]`);
};

const currentPath = async () => {
  const location = await t.eval(() => window.location);

  return location.pathname;
};

const localStorageGet = ClientFunction(key => JSON.parse(localStorage.getItem(key)));

export { reseed, login, logout, currentPath, localStorageGet };