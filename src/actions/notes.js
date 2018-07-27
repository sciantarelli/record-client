import { NOTE_NEW, NOTE_CREATE, NOTE_CREATE_SUCCESS, NOTE_CREATE_ERROR, NOTE_CREATE_VALIDATION_ERRORS, NOTE_FETCH_SUCCESS, NOTE_FETCH, NOTE_FETCH_ERROR, NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR, NOTE_UPDATE_VALIDATION_ERRORS, NOTES_FETCH_SUCCESS, NOTES_FETCH, NOTES_FETCH_ERROR, NOTE_CLOSE } from '../constants/actionTypes';


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

const doCreateNoteValidationErrors = errors => ({
  type: NOTE_CREATE_VALIDATION_ERRORS,
  errors
});

const doFetchNote = id => ({
  type: NOTE_FETCH,
  id
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

const doUpdateNoteValidationErrors = (id, errors) => ({
  type: NOTE_UPDATE_VALIDATION_ERRORS,
  id,
  errors
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

export { doNewNote, doSaveNote, doCreateNote, doCreateNoteSuccess, doCreateNoteError, doCreateNoteValidationErrors, doFetchNote, doFetchNoteSuccess, doFetchErrorNote, doUpdateNote, doUpdateNoteSuccess, doUpdateNoteError, doUpdateNoteValidationErrors, doCloseNote, doFetchNotesSuccess, doFetchNotes, doFetchErrorNotes };