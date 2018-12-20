import { NOTE_NEW, NOTE_CREATE, NOTE_CREATE_SUCCESS, NOTE_CREATE_ERROR, NOTE_VALIDATION_ERRORS, NOTE_FETCH_SUCCESS, NOTE_FETCH, NOTE_FETCH_ERROR, NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR, NOTES_FETCH_SUCCESS, NOTES_FETCH, NOTES_FETCH_ERROR, NOTE_CLOSE, NOTE_DELETE, NOTE_DELETE_SUCCESS, NOTE_DELETE_ERROR } from '../constants/actionTypes';

import { BASE_API_URL } from '../constants';


const doNewNote = () => ({
  type: NOTE_NEW
});

const doSaveNote = formProps => {
  const crudAction = formProps.id ? doUpdateNote : doCreateNote;

  return crudAction(formProps);
};

const doCreateNote = formProps => ({
  type: NOTE_CREATE,
  formProps,
  waitFor: [NOTE_CREATE_SUCCESS, NOTE_CREATE_ERROR]
});

const doCreateNoteSuccess = note => ({
  type: NOTE_CREATE_SUCCESS,
  note,
  id: note.id
});

const doCreateNoteError = error => ({
  type: NOTE_CREATE_ERROR,
  error
});

const doFetchNote = id => ({
  type: NOTE_FETCH,
  id,
  meta: {
    offline: {
      // the network action to execute:
      effect: { url: `${BASE_API_URL}/notes/${id}`, method: 'GET' },
      // action to dispatch when effect succeeds:
      commit: { type: NOTE_FETCH_SUCCESS, meta: { id: id } },
      // action to dispatch if network action fails permanently:
      rollback: { type: NOTE_FETCH_ERROR, id: id, error: new Error('testing') }
    }
  }
});

const doFetchNoteSuccess = note => ({
  type: NOTE_FETCH_SUCCESS,
  note
});

const doFetchErrorNote = (id, error) => ({
  type: NOTE_FETCH_ERROR,
  id,
  error
});

const doUpdateNote = formProps => ({
  id: formProps.id,
  type: NOTE_UPDATE,
  formProps,
  waitFor: [NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR]
});

const doUpdateNoteSuccess = note => ({
  type: NOTE_UPDATE_SUCCESS,
  note
});

const doUpdateNoteError = (id, error) => ({
  type: NOTE_UPDATE_ERROR,
  id,
  error
});

const doNoteValidationErrors = (id, errors) => ({
  type: NOTE_VALIDATION_ERRORS,
  id,
  errors: ( Array.isArray(errors) ? errors : [errors] )
});

const doCloseNote = id => ({
  type: NOTE_CLOSE,
  id
});

const doFetchNotes = query => ({
  type: NOTES_FETCH,
  query,
});

const doFetchNotesSuccess = notes => ({
  type: NOTES_FETCH_SUCCESS,
  notes,
});

const doFetchErrorNotes = error => ({
  type: NOTES_FETCH_ERROR,
  error,
});

const doDeleteNote = id => ({
  type: NOTE_DELETE,
  id,
  waitFor: [NOTE_DELETE_SUCCESS, NOTE_DELETE_ERROR]
});

const doDeleteNoteSuccess = id => ({
  type: NOTE_DELETE_SUCCESS,
  id
});

const doDeleteNoteError = (id, error) => ({
  type: NOTE_DELETE_ERROR,
  id,
  error
});

export { doNewNote, doSaveNote, doCreateNote, doCreateNoteSuccess, doCreateNoteError, doFetchNote, doFetchNoteSuccess, doFetchErrorNote, doUpdateNote, doUpdateNoteSuccess, doUpdateNoteError, doNoteValidationErrors, doCloseNote, doFetchNotesSuccess, doFetchNotes, doFetchErrorNotes, doDeleteNote, doDeleteNoteSuccess, doDeleteNoteError };