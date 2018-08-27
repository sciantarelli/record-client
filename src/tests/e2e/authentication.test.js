import { Selector } from 'testcafe';
import { reseed, login, logout, currentPath, localStorageGet } from './support/helpers';
import { LOGIN_PATH, NOTES_PATH, AUTH_STORAGE } from '../../constants';

fixture `Authentication`// declare the fixture
    .before(reseed())
    .page(`http://localhost:3000`); // start page

test('Login and Logout', async t => {
  await login();
  await t.expect(await currentPath()).eql(NOTES_PATH);

  let auth = await localStorageGet('auth');
  await t.expect(auth.client.length).gt(0);
  await t.expect(auth.accessToken.length).gt(0);
  await t.expect(auth.uid.length).gt(0);
  await t.expect(auth.expiry).gt(0);

  await logout();
  await t.expect(await currentPath()).eql(LOGIN_PATH);

  auth = await localStorageGet(AUTH_STORAGE);
  await t.expect(auth).typeOf('null');
});

test('Incorrect Login', async t => {
  await login('wrong-email@test.com', 'password');
  await t.expect(await currentPath()).eql(LOGIN_PATH);
  await t.expect(Selector('.error-messages').exists).ok();
});




