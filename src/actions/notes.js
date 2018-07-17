import { NOTE_ADD, NOTE_FETCH, NOTE_FETCH_ERROR, NOTES_ADD, NOTES_FETCH, NOTES_FETCH_ERROR } from '../constants/actionTypes';

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

export { doFetchNote, doAddNote, doFetchErrorNote, doAddNotes, doFetchNotes, doFetchErrorNotes };