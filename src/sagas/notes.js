import { call, put, select } from 'redux-saga/effects';
import { fetchNote, fetchNotes } from '../api/notes';
import { doAddNote, doFetchErrorNote, doAddNotes, doFetchErrorNotes } from '../actions/notes';
import { doAuthUpdated } from '../actions/auth';


function* handleFetchNote(action) {
  const get_auth = (state) => state.auth;

  try {
    const auth = yield select(get_auth);
    const result = yield call(fetchNote, action.id, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doAddNote(result.data));
  } catch (error) {
    // TODO: This is probably too generic. Any type of error could be shown to the user.
    yield put(doFetchErrorNote(action.id, error));
  }
}


function* handleFetchNotes(action) {
  const { query } = action;
  const get_auth = (state) => state.auth;

  try {
    const auth = yield select(get_auth);
    const result = yield call(fetchNotes, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doAddNotes(result.data));
  } catch (error) {
    // TODO: This is probably too generic. Any type of error could be shown to the user.
    yield put(doFetchErrorNotes(error));
  }
}

export { handleFetchNote, handleFetchNotes };


// TODO: Really think about all the things that could go wrong with these operations.
