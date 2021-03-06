import { push } from 'connected-react-router';
import { call, put, select } from 'redux-saga/effects';
import { postAuthUser, deleteAuthUser } from '../api/auth';
import { doAuthSuccess, doAuthError } from '../actions/auth';
import { doStoreReset } from '../actions/store';
import { NOTES_PATH } from '../constants';
import { cleanHeaders } from '../helpers';


const get_auth = (state) => state.auth;


function* handleAuthUser(action) {
  const { formProps } = action;

  try {
    const result = yield call(postAuthUser, formProps);
    yield put(doAuthSuccess(result.headers));
    setAuthToLocalStorage(result.headers);
    yield put(push(NOTES_PATH)); // TODO: Eventually change this to '/' and switch to using doDispatchThenRoute if it still exists
  } catch (error) {
    const { response} = error;

    clearAuthFromLocalStorage();

    if (response) {
      if (response.status === 401) {
        yield put(doAuthError(new Error(response.data.errors)));
        return;
      }
    }

    yield put(doAuthError(error));
  }
}


function* handleAuthUpdated(action) {
  let { headers } = action;

  if (!authWasRefreshed(headers)) return;

  try {
    yield put(doAuthSuccess(headers));
    setAuthToLocalStorage(headers);
  } catch (error) {
    yield put(doAuthError(error));
    // TODO: This really shouldn't produce an error condition unless it's in the application itself. For now, output message to user until a better solution is in place.
    clearAuthFromLocalStorage();
    yield put(doStoreReset());
    yield put(doAuthError(new Error('Authentication update failed. Please report to site administrator!')));
  }
}


function* handleAuthDestroy(action) {
  try {
    const auth = yield select(get_auth);
    yield call(deleteAuthUser, auth);
  } catch (error) {
    // TODO: User probably doesn't care if failed to logout on server, but consider doing something here
  } finally {
    clearAuthFromLocalStorage();
    yield put(doStoreReset());
  }
}

function authWasRefreshed(headers) {
  const { accessToken, client, expiry, uid } = cleanHeaders(headers);

  return (accessToken && client && uid && expiry) ? true : false;
}


function setAuthToLocalStorage(headers) {
  const { accessToken, client, expiry, uid } = cleanHeaders(headers);

  const auth = {
    accessToken,
    client,
    expiry,
    uid
  };

  localStorage.setItem('auth', JSON.stringify(auth));
}


function clearAuthFromLocalStorage() {
  localStorage.removeItem('auth');
}


export { handleAuthUser, handleAuthUpdated, handleAuthDestroy };