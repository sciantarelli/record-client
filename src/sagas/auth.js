import { call, put } from 'redux-saga/effects';
import { postAuthUser } from '../api/auth';
import { doAuthSuccess, doAuthError } from '../actions/auth';

function* handleAuthUser(action) {
  const { formProps } = action;

  try {
    const result = yield call(postAuthUser, formProps);
    yield put(doAuthSuccess(result.headers));
    setAuthToLocalStorage(result.headers);
  } catch (error) {
    yield put(doAuthError(error));
    clearAuthFromLocalStorage();
  }
}

function* handleAuthUpdated(action) {
  try {
    yield put(doAuthSuccess(action.headers));
    setAuthToLocalStorage(action.headers);
  } catch (error) {
    yield put(doAuthError(error));
    // TODO: Since we're doing this, should auth info also be cleared from the store? Hmm...
    clearAuthFromLocalStorage();
  }
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