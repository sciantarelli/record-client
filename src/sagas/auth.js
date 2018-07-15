import { call, put } from 'redux-saga/effects';
import { postAuthUser } from '../api/auth';
import { doAuthSuccess, doAuthError } from '../actions/auth';
import { push } from 'react-router-redux';

function* handleAuthUser(action) {
  const { formProps } = action;

  try {
    const result = yield call(postAuthUser, formProps);
    yield put(doAuthSuccess(result.headers));
    setAuthToLocalStorage(result.headers);
    yield put(push('/notes')); // TODO: Eventually change this to '/'
  } catch (error) {
    yield put(doAuthError(error));
    clearAuthFromLocalStorage();
  }
}

function* handleAuthUpdated(action) {
  let { headers } = action;

  // This happens when the server deems requests came in batches
  if (tokenNotRefreshed(headers)) {
    return;
  }

  try {
    yield put(doAuthSuccess(headers));
    setAuthToLocalStorage(headers);
  } catch (error) {
    yield put(doAuthError(error));
    // TODO: Since we're doing this, should auth info also be cleared from the store? Hmm...
    clearAuthFromLocalStorage();
  }
}

function tokenNotRefreshed(headers) {
  const { client, expiry, uid } = headers;

  return client && uid && !expiry && !headers['access-token'];
}

function setAuthToLocalStorage(headers) {
  const { client, expiry, uid } = headers;

  const auth = {
    access_token: headers['access-token'],
    client,
    expiry,
    uid,
  };

  localStorage.setItem('auth', JSON.stringify(auth));
}

function clearAuthFromLocalStorage() {
  localStorage.removeItem('auth');
}

export { handleAuthUser, handleAuthUpdated };