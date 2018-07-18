import { takeEvery, all } from 'redux-saga/effects';
import { NOTE_FETCH, NOTE_UPDATE, NOTES_FETCH, AUTH_USER, AUTH_UPDATED } from '../constants/actionTypes';
import { handleFetchNote, handleUpdateNote, handleFetchNotes } from './notes';
import { handleAuthUser, handleAuthUpdated } from './auth';

function *watchAll() {
  yield all([
    takeEvery(NOTE_FETCH, handleFetchNote),
    takeEvery(NOTE_UPDATE, handleUpdateNote),
    takeEvery(NOTES_FETCH, handleFetchNotes),
    takeEvery(AUTH_USER, handleAuthUser),
    takeEvery(AUTH_UPDATED, handleAuthUpdated)
  ])
}

export default watchAll;