import { takeEvery, all } from 'redux-saga/effects';
import { NOTES_FETCH } from '../constants/actionTypes';
import { handleFetchNotes } from './notes';

function *watchAll() {
  yield all([
    takeEvery(NOTES_FETCH, handleFetchNotes),
  ])
}

export default watchAll;