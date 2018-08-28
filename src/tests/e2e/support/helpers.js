import axios from 'axios';
import { t, ClientFunction, Role } from 'testcafe';
import { LOGIN_PATH, LOGOUT_PATH } from '../../../constants';
import config from './config';


const reseed = () => async ctx => {
  await axios({method: 'get', url: `${config.api_url}${config.api_reseed_path}`});
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

// TODO: preserveUrl is an option I want to keep, but to be effective I need to add in proper redirect after login, to wherever the user was trying to go (ie /ideas or whatever)
const user =
    Role(config.app_url + LOGIN_PATH, async t => {
      await login();
    }, { preserveUrl: true });


export {
  reseed,
  login,
  logout,
  currentPath,
  localStorageGet,
  user
};