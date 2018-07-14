const getNotes = notesState =>
    notesState.notes;

const getNotesError = notesState =>
    notesState.error;

const getNotesIsFetching = notesState =>
    notesState.isFetching;

export { getNotes, getNotesError, getNotesIsFetching };