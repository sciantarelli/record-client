import { push } from 'react-router-redux';
import { call, put, select } from 'redux-saga/effects';
import { createNote, fetchNote, updateNote, fetchNotes } from '../api/notes';
import { doAuthUpdated } from '../actions/auth';
import { doCreateNoteSuccess, doCreateNoteError, doFetchNoteSuccess, doFetchErrorNote, doFetchNotesSuccess, doFetchErrorNotes, doUpdateNoteSuccess, doUpdateNoteError, doCloseNote } from '../actions/notes';


const get_auth = (state) => state.auth;


function* handleFetchNote(action) {
  const { id } = action;

  try {
    const auth = yield select(get_auth);
    const result = yield call(fetchNote, id, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doFetchNoteSuccess(result.data));
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

function* handleCreateNote(action) {
  try {
    const auth = yield select(get_auth);
    const result = yield call(createNote, action.formProps, auth);
    const note = result.data;

    yield put(doAuthUpdated(result.headers));
    yield put(doCreateNoteSuccess(note));
    yield put(doCloseNote('new'));
    yield put(push(`/notes/${note.id}`))
  } catch (error) {
    // TODO: Flesh out error handling
    yield put(doCreateNoteError(error));
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
    yield put(doFetchNotesSuccess(result.data));
  } catch (error) {
    // TODO: Flesh out error handling
    yield put(doFetchErrorNotes(error));
  }
}

export { handleCreateNote, handleFetchNote, handleUpdateNote, handleFetchNotes };
