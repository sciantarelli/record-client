import { takeEvery, all } from 'redux-saga/effects';
import { NOTES_FETCH, AUTH_USER } from '../constants/actionTypes';
import { handleFetchNotes } from './notes';
import { handleAuthUser } from './auth';

function *watchAll() {
  yield all([
    takeEvery(NOTES_FETCH, handleFetchNotes),
    takeEvery(AUTH_USER, handleAuthUser)
  ])
}

export default watchAll;