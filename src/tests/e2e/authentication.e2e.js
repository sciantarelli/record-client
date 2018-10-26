import { Selector } from 'testcafe';
import { reseed, login, logout, currentPath, localStorageGet } from './support/helpers';
import { LOGIN_PATH, NOTES_PATH, AUTH_STORAGE } from '../../constants';
import config from './support/config';


fixture('Authentication')
    .before(reseed())
    .page(config.app_url);


test('Login and Logout', async t => {
  await login();
  await t.expect(await currentPath()).eql(NOTES_PATH);

  let auth = await localStorageGet('auth');

  await t
    .expect(auth.client.length).gt(0)
    .expect(auth.accessToken.length).gt(0)
    .expect(auth.uid.length).gt(0)
    .expect(auth.expiry.length).gt(0);

  await logout();
  await t.expect(await currentPath()).eql(LOGIN_PATH);

  auth = await localStorageGet(AUTH_STORAGE);
  await t.expect(auth).typeOf('null');
});


test('Incorrect Login', async t => {
  await login('wrong-email@test.com', 'password');

  await t
    .expect(await currentPath()).eql(LOGIN_PATH)
    .expect(Selector('.error-messages').exists).ok();
});


test('Unauthorized Action', async t => {
  await t.navigateTo(NOTES_PATH);
  await t.expect(await currentPath()).eql(LOGIN_PATH);
});




