import { call, put, select } from 'redux-saga/effects';
import { fetchNote, updateNote, fetchNotes } from '../api/notes';
import { doAddNote, doFetchErrorNote, doAddNotes, doFetchErrorNotes, doUpdateNoteSuccess, doUpdateNoteError, doCloseNote } from '../actions/notes';
import { doAuthUpdated } from '../actions/auth';
import { push } from 'react-router-redux';


const get_auth = (state) => state.auth;


function* handleFetchNote(action) {
  const { id } = action;

  try {
    const auth = yield select(get_auth);
    const result = yield call(fetchNote, id, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doAddNote(result.data));
  } catch (error) {
    const { response, request } = error;

    if (response) {
      if (response.status === 404) {
        yield put(push('/404'));
        yield put(doAuthUpdated(response.headers));
        yield put(doCloseNote(id));
        return;
      }

      // TODO: Flesh this out to handle other response codes other than just 404's

      yield put(doFetchErrorNote(action.id, error));
      return;
    }

    // For now this will produce errors such as "Network Error"
    if (request) {
      yield put(doFetchErrorNote(action.id, error));
      return;
    }

    // At this point, there's probably an error in the application itself
    yield put(doFetchErrorNote(action.id, error));
  }
}


function* handleUpdateNote(action) {

  // TODO: More validation here of form props?

  try {
    const auth = yield select(get_auth);
    const result = yield call(updateNote, action.formProps, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doUpdateNoteSuccess(action.formProps));
  } catch (error) {
    // TODO: Flesh out error handling
    yield put(doUpdateNoteError(action.formProps.id, error));
  }

}


function* handleFetchNotes(action) {
  const { query } = action;

  try {
    const auth = yield select(get_auth);
    const result = yield call(fetchNotes, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doAddNotes(result.data));
  } catch (error) {
    // TODO: Flesh out error handling
    yield put(doFetchErrorNotes(error));
  }
}

export { handleFetchNote, handleUpdateNote, handleFetchNotes };
