import { call, put, select } from 'redux-saga/effects';
import { is404AndHandled, is401AndHandled, is422AndHandled, handleNoResponse, getResponseErrors } from './errors';
import { createNote, fetchNote, updateNote, deleteNote, fetchNotes } from '../api/notes';
import { doAuthUpdated } from '../actions/auth';
import { doCreateNoteSuccess, doCreateNoteError, doNoteValidationErrors, doFetchNoteSuccess, doFetchErrorNote, doFetchNotesSuccess, doFetchErrorNotes, doUpdateNoteSuccess, doUpdateNoteError, doDeleteNoteSuccess, doDeleteNoteError, doCloseNote } from '../actions/notes';
import { NEW_ID } from '../constants';


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
      if (yield* is401AndHandled(response)) return;
      if (yield* is404AndHandled(response, doCloseNote(id))) return;

      // TODO: Do something more generic here, perhaps. There's a response, but something went wrong. This case exists for other handle methods below as well.
      yield put(doFetchErrorNote(action.id, error));
      return;
    }

    yield* handleNoResponse(request, doFetchErrorNote(action.id, error));
  }
}

function* handleCreateNote(action) {
  try {
    const auth = yield select(get_auth);
    const result = yield call(createNote, action.formProps, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doCreateNoteSuccess(result.data));
    yield put(doCloseNote(NEW_ID));
  } catch (error) {
    const { response, request } = error;

    if (response) {
      if (yield* is401AndHandled(response)) return;
      if (yield* is422AndHandled(response, doNoteValidationErrors(NEW_ID, getResponseErrors(response)))) return;

      yield put(doCreateNoteError(error));
      return;
    }

    yield* handleNoResponse(request, doCreateNoteError(error));
  }
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
      if (yield* is401AndHandled(response)) return;
      if (yield* is422AndHandled(response, doNoteValidationErrors(id, getResponseErrors(response)))) return;

      yield put(doUpdateNoteError(id, error));
      return;
    }

    yield* handleNoResponse(request, doUpdateNoteError(id, error));
  }

}


function* handleDeleteNote(action) {
  const { id } = action;

  try {
    const auth = yield select(get_auth);
    const result = yield call(deleteNote, id, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doDeleteNoteSuccess(id));
  } catch (error) {
    const { response, request } = error;

    if (response) {
      if (yield* is401AndHandled(response)) return;
      if (yield* is422AndHandled(response, doNoteValidationErrors(id, getResponseErrors(response)))) return;

      yield put(doDeleteNoteError(id, error));
      return;
    }

    yield* handleNoResponse(request, doDeleteNoteError(id, error));
  }
}


function* handleFetchNotes(action) {
  try {
    const auth = yield select(get_auth);
    const result = yield call(fetchNotes, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doFetchNotesSuccess(result.data));
  } catch (error) {
    const { response, request } = error;

    if (response) {
      if (yield* is401AndHandled(response)) return;

      yield put(doFetchErrorNotes(error));
      return;
    }

    yield* handleNoResponse(request, doFetchErrorNotes(error));
  }
}


export { handleCreateNote, handleFetchNote, handleUpdateNote, handleDeleteNote, handleFetchNotes };