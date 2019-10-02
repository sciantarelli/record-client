import { channel } from 'redux-saga'
import { LOCATION_CHANGE } from 'connected-react-router';
import { put, call, fork, take, takeEvery, takeLatest, all } from 'redux-saga/effects';
import {
  DISPATCH_THEN_ROUTE,
  NOTE_CREATE,
  NOTE_FETCH,
  NOTE_UPDATE,
  NOTE_DELETE,
  NOTES_FETCH,
  AUTH_USER,
  AUTH_UPDATED,
  AUTH_DESTROY,
  CRUD_FETCH
} from '../constants/actionTypes';
import { handleAuthUser, handleAuthUpdated, handleAuthDestroy } from './auth';
import { handleCreateNote, handleFetchNote, handleUpdateNote, handleDeleteNote, handleFetchNotes } from './notes';
import { handleFetch, handleFormDataChange } from './crudSagas';
import { handleLocationChange, handleDispatchThenRoute } from './general';


function *watchAll() {
  yield all([
    takeEvery(DISPATCH_THEN_ROUTE, handleDispatchThenRoute),
    takeEvery(LOCATION_CHANGE, handleLocationChange),
    takeLatest(AUTH_USER, handleAuthUser),
    // If AUTH_UPDATED used takeLatest, it could be missing the access token and client entries if the server deemed the last update to be a batch and the one before it actually updated all the headers
    takeEvery(AUTH_UPDATED, handleAuthUpdated),
    takeLatest(AUTH_DESTROY, handleAuthDestroy),
    takeLatest('@@redux-form/CHANGE', handleFormDataChange),
    channelRequests({
      [CRUD_FETCH]: handleFetch,
      [NOTES_FETCH]: handleFetchNotes,
      [NOTE_FETCH]: handleFetchNote,
      [NOTE_CREATE]: handleCreateNote,
      [NOTE_UPDATE]: handleUpdateNote,
      [NOTE_DELETE]: handleDeleteNote
    })
  ])
}


function* channelRequests(actionHandlers) {
  // Eventually, this will allow for n number of channels. This will suffice for now
  const genChannel = yield call(channel);
  const channel1 = yield call(channel);
  const channel2 = yield call(channel);
  const channel3 = yield call(channel);

  // Example from docs, not applicable here for now
  // create 3 worker 'threads'
  // for (var i = 0; i < 3; i++) {
  //   yield fork(handleRequest, chan, actionHandlers);
  // }

  yield fork(handleChanneledRequest, genChannel, actionHandlers);
  yield fork(handleChanneledRequest, channel1, actionHandlers);
  yield fork(handleChanneledRequest, channel2, actionHandlers);
  yield fork(handleChanneledRequest, channel3, actionHandlers);

  const channelMap = {
    '0': channel1,
    '1': channel2,
    '2': channel3,
  };

  while (true) {
    const action = yield take(Object.keys(actionHandlers));

    // True for actions such as NOTE_CREATE and NOTES_FETCH, that don't have ids
    if (!action.hasOwnProperty('id') || !action.id) {
      yield put(genChannel, action);
      continue;
    }

    // Actions that have ids will use of one three channels, depending on the modulo result
    // Therefore, actions having the same id will always run in the same channel, and won't be subject to race conditions
    yield put(channelMap[action.id % 3], action);
  }
}

function* handleChanneledRequest(chan, actionHandlers) {
  while (true) {
    const action = yield take(chan);
    yield call(actionHandlers[action.type], action);
  }
}


export default watchAll;