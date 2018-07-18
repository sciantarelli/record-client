import { call, put, select } from 'redux-saga/effects';
import { fetchNote, updateNote, fetchNotes } from '../api/notes';
import { doAddNote, doFetchErrorNote, doAddNotes, doFetchErrorNotes, doUpdateNoteSuccess, doUpdateNoteError } from '../actions/notes';
import { doAuthUpdated } from '../actions/auth';


const get_auth = (state) => state.auth;


function* handleFetchNote(action) {

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


function* handleUpdateNote(action) {

  // TODO: More validation here of form props?

  try {
    const auth = yield select(get_auth);
    const result = yield call(updateNote, action.formProps, auth);
    yield put(doAuthUpdated(result.headers));
    yield put(doUpdateNoteSuccess(action.formProps));
    // TODO: Replace in notesState if notesState is populated. Do this in reducer which will catch NOTE_UPDATED_SUCCESS
  } catch (error) {
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
    // TODO: This is probably too generic. Any type of error could be shown to the user.
    yield put(doFetchErrorNotes(error));
  }
}

export { handleFetchNote, handleUpdateNote, handleFetchNotes };


// TODO: Really think about all the things that could go wrong with these operations.
