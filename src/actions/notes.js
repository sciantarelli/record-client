import { NOTE_CREATE, NOTE_FETCH_SUCCESS, NOTE_FETCH, NOTE_FETCH_ERROR, NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR, NOTES_FETCH_SUCCESS, NOTES_FETCH, NOTES_FETCH_ERROR, NOTE_CLOSE } from '../constants/actionTypes';


const doCreateNote = formProps => ({
  type: NOTE_CREATE,
  formProps
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
  formProps
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

export { doCreateNote, doFetchNote, doFetchNoteSuccess, doFetchErrorNote, doUpdateNote, doUpdateNoteSuccess, doUpdateNoteError, doCloseNote, doFetchNotesSuccess, doFetchNotes, doFetchErrorNotes };