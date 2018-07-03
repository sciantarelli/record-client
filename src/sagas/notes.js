import { call, put } from 'redux-saga/effects';
import { fetchNotes } from '../api/notes';
import { doAddNotes, doFetchErrorNotes } from '../actions/notes';

function* handleFetchNotes(action) {
  const { query } = action;

  try {
    const result = yield call(fetchNotes);
    yield put(doAddNotes(result.data));
  } catch (error) {
    yield put(doFetchErrorNotes(error));
  }
}

export { handleFetchNotes };