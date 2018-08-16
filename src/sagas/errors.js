import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';
import { doActions } from './helpers';
import { doAuthUpdated } from '../actions/auth';
import { doStoreReset } from '../actions/store';
import { clearAuthFromLocalStorage } from './helpers';


function* handle401() {
  clearAuthFromLocalStorage();
  yield put(doStoreReset());
}

function* is401AndHandled(response) {
  if (response.status !== 401) return false;

  yield* handle401();

  return true;
}


function* handle404(response, actions) {
  yield put(push('/404'));
  yield put(doAuthUpdated(response.headers));
  if (actions) yield* doActions(actions);
}

function* is404AndHandled(response, actions) {
  if (response.status !== 404) return false;

  yield* handle404(response, actions);

  return true;
}


function* handle422(headers, actions) {
  yield put(doAuthUpdated(headers));
  if (actions) yield* doActions(actions);
}


function* is422AndHandled(response, actions) {
  if (response.status !== 422) return false;

  yield* handle422(response.headers, actions);

  return true;
}


function* handleNoResponse(request, defaultAction, requestAction) {
  // For now this will produce errors such as "Network Error"
  if (request) {
    yield put(requestAction || defaultAction);
    return;
  }

  // At this point, there's probably an error in the application itself
  yield put(defaultAction);
}


const getResponseErrors = response => {
  return response && response.data && (response.data.error || response.data.errors);
};

export { handle404, is404AndHandled, handle401, is401AndHandled, handle422, is422AndHandled, handleNoResponse, getResponseErrors }