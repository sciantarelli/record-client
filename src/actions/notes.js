import { NOTES_ADD, NOTES_FETCH, NOTES_FETCH_ERROR }from '../constants/actionTypes';

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

export { doAddNotes, doFetchNotes, doFetchErrorNotes };