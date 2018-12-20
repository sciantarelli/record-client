import { sortObjectsBy } from '../helpers';

const getNote = (openNotesState, id) =>
    openNotesState[id];

const getNoteError = (openNotesState, id) => {
  const note = openNotesState[id];
  return note && note.error && note.error.message;
};

const getNoteValidationErrors = (openNotesState, id) => {
  const note = openNotesState[id];
  return note && note.validationErrors;
};

const getNoteIsFetching = (openNotesState, id) =>
    openNotesState[id] && openNotesState[id].isFetching;

const getNoteIsSaving = (openNotesState, id) =>
    openNotesState[id] && openNotesState[id].isSaving;

const getNoteIsDeleting = (openNotesState, id) =>
    openNotesState[id] && openNotesState[id].isDeleting;

const getNoteIsDirty = (openNotesState, id) =>
    openNotesState[id] && openNotesState[id].isDirty;

const getOpenNotes = openNotesState => openNotesState;

const getNotes = notesState =>
    notesState.notes;

const getNotesArray = (notesState, order) => {
  if (notesState.notes === null) return;

  if (!['updatedAt', 'name'].includes(order)) {
    order = 'updatedAt';
  }

  const sorted = sortObjectsBy({...notesState.notes}, order);

  return order === 'updatedAt' ? sorted.reverse() : sorted;
};

const getNotesError = notesState =>
    notesState.error && notesState.error.message;

const getNotesIsFetching = notesState =>
    notesState.isFetching;

export { getNote, getNoteError, getNoteValidationErrors, getNoteIsFetching, getNoteIsSaving, getOpenNotes, getNotes, getNotesArray, getNotesError, getNotesIsFetching, getNoteIsDeleting, getNoteIsDirty };