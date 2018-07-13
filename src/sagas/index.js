import { takeEvery, all } from 'redux-saga/effects';
import { NOTES_FETCH, AUTH_USER, AUTH_UPDATED } from '../constants/actionTypes';
import { handleFetchNotes } from './notes';
import { handleAuthUser, handleAuthUpdated } from './auth';

function *watchAll() {
  yield all([
    takeEvery(NOTES_FETCH, handleFetchNotes),
    takeEvery(AUTH_USER, handleAuthUser),
    takeEvery(AUTH_UPDATED, handleAuthUpdated)
  ])
}

export default watchAll;