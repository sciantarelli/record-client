// TODO: Cleanup all imports in all files, organize consistently by type of import
import { takeEvery, all } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { NOTE_CREATE, NOTE_FETCH, NOTE_UPDATE, NOTES_FETCH, AUTH_USER, AUTH_UPDATED, AUTH_DESTROY } from '../constants/actionTypes';
import { handleCreateNote, handleFetchNote, handleUpdateNote, handleFetchNotes } from './notes';
import { handleAuthUser, handleAuthUpdated, handleAuthDestroy } from './auth';
import { handleLocationChange } from './general';


function *watchAll() {
  yield all([
    takeEvery(LOCATION_CHANGE, handleLocationChange),
    takeEvery(NOTE_CREATE, handleCreateNote),
    takeEvery(NOTE_FETCH, handleFetchNote),
    takeEvery(NOTE_UPDATE, handleUpdateNote),
    takeEvery(NOTES_FETCH, handleFetchNotes),
    takeEvery(AUTH_USER, handleAuthUser),
    takeEvery(AUTH_UPDATED, handleAuthUpdated),
    takeEvery(AUTH_DESTROY, handleAuthDestroy)
  ])
}


export default watchAll;