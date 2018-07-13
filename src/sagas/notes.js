import { call, put, select } from 'redux-saga/effects';
import { fetchNotes } from '../api/notes';
import { doAddNotes, doFetchErrorNotes } from '../actions/notes';
import { authUpdated } from '../actions/auth';

function* handleFetchNotes(action) {
  const { query } = action;
  const get_auth = (state) => state.auth;

  try {
    const auth = yield select(get_auth);
    const result = yield call(fetchNotes, auth);
    yield put(authUpdated(result.headers));
    // TODO: May not need yield here.
    yield put(doAddNotes(result.data));

  } catch (error) {
    // TODO: This is probably too generic. Any type of error could be shown to the user.
    yield put(doFetchErrorNotes(error));
  }
}

export { handleFetchNotes };


// TODO: Really think about all the things that could go wrong with these operations.
