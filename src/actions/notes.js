import { NOTE_ADD, NOTE_FETCH, NOTE_FETCH_ERROR, NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR, NOTES_ADD, NOTES_FETCH, NOTES_FETCH_ERROR, NOTE_CLOSE } from '../constants/actionTypes';

const doFetchNote = id => ({
  type: NOTE_FETCH,
  id
});

const doAddNote = note => ({
  type: NOTE_ADD,
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

const doAddNotes = notes => ({
  type: NOTES_ADD,
  notes,
});

const doFetchErrorNotes = error => ({
  type: NOTES_FETCH_ERROR,
  error,
});

export { doFetchNote, doAddNote, doFetchErrorNote, doUpdateNote, doUpdateNoteSuccess, doUpdateNoteError, doCloseNote, doAddNotes, doFetchNotes, doFetchErrorNotes };