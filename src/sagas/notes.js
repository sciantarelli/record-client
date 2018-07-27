import { push } from 'react-router-redux';
import { call, put, select } from 'redux-saga/effects';
import { createNote, fetchNote, updateNote, deleteNote, fetchNotes } from '../api/notes';
import { doAuthUpdated } from '../actions/auth';
import { doCreateNoteSuccess, doCreateNoteError, doCreateNoteValidationErrors, doFetchNoteSuccess, doFetchErrorNote, doFetchNotesSuccess, doFetchErrorNotes, doUpdateNoteSuccess, doUpdateNoteError, doUpdateNoteValidationErrors, doDeleteNoteSuccess, doDeleteNoteError, doCloseNote } from '../actions/notes';


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
  } catch (error) {
    yield errorHandling(error);
  }
}

// TODO: This is incomplete, and just a start into refactoring. Only works for note creation, not update, etc. Eventually refactoring so it can be used by fetch, create, update, etc
function* errorHandling(error) {
  const { response, request } = error;

  if (response) {
    const { status, data } = response;

    if (response.status === 404) {
      yield put(push('/404'));
      yield put(doAuthUpdated(response.headers));
      // This shouldn't happen at all, but needs to for handleFetchNote(), etc. So, note this difference when refactoring. It could be a boolean param passed in, whether to close the component
      // yield put(doCloseNote(id));
      return;
    }

    if (status === 422 && data && data.errors) {
      yield put(doCreateNoteValidationErrors(data.errors)) // Needs to be dynamic
    }
  }

  // For now this will produce errors such as "Network Error"
  if (request) {
    yield put(doCreateNoteError(error));
    return;
  }

  yield put(doCreateNoteError(error)); // Needs to be dynamic
}

function* handleUpdateNote(action) {

  // TODO: More validation here of form props?

  const { id } = action.formProps;

  try {
    const auth = yield select(get_auth);
    const result = yield call(updateNote, action.formProps, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doUpdateNoteSuccess(action.formProps));
  } catch (error) {
    const { response, request } = error;

    if (response) {
      const { status, data } = response;

      if (response.status === 404) {
        yield put(push('/404'));
        yield put(doAuthUpdated(response.headers));

        return;
      }

      if (status === 422 && data && data.errors) {
        // TODO: Determine why 422 returns headers for update, but not create
        yield put(doAuthUpdated(response.headers));
        yield put(doUpdateNoteValidationErrors(id, data.errors));
      }
    }

    // For now this will produce errors such as "Network Error"
    if (request) {
      yield put(doUpdateNoteError(action.formProps.id, error));
      return;
    }

    yield put(doUpdateNoteError(action.formProps.id, error));
  }

}


function* handleDeleteNote(action) {
  try {
    const auth = yield select(get_auth);
    const result = yield call(deleteNote, action.id, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doDeleteNoteSuccess(action.id));
  } catch (error) {
    // TODO: Flesh out error handling
    yield put(doDeleteNoteError(action.id, error))
  }
}


function* handleFetchNotes(action) {
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

export { handleCreateNote, handleFetchNote, handleUpdateNote, handleDeleteNote, handleFetchNotes };
