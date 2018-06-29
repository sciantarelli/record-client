import { call, put } from 'redux-saga/effects';
import { fetchNotes } from '../api/notes';
import { doAddNotes, doFetchErrorNotes } from '../actions/notes';

function* handleFetchNotes(action) {
  const { query } = action;

  try {
    const result = yield call(fetchNotes, query);
    yield put(doAddNotes(result.hits));
  } catch (error) {
    yield put(doFetchErrorNotes(error));
  }
}

export { handleFetchNotes };