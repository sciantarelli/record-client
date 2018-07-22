import { takeEvery, all } from 'redux-saga/effects';
import { DISPATCH_THEN_ROUTE, NOTE_FETCH, NOTE_UPDATE, NOTES_FETCH, AUTH_USER, AUTH_UPDATED, AUTH_DESTROY } from '../constants/actionTypes';
import { handleFetchNote, handleUpdateNote, handleFetchNotes } from './notes';
import { handleAuthUser, handleAuthUpdated, handleAuthDestroy } from './auth';
import { handleDispatchThenRoute } from './general';

function *watchAll() {
  yield all([
    takeEvery(NOTE_FETCH, handleFetchNote),
    takeEvery(NOTE_UPDATE, handleUpdateNote),
    takeEvery(NOTES_FETCH, handleFetchNotes),
    takeEvery(AUTH_USER, handleAuthUser),
    takeEvery(AUTH_UPDATED, handleAuthUpdated),
    takeEvery(AUTH_DESTROY, handleAuthDestroy),
    takeEvery(DISPATCH_THEN_ROUTE, handleDispatchThenRoute)
  ])
}


export default watchAll;