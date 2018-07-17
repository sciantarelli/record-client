const getNote = (openNotesState, id) =>
    openNotesState[id];

const getNoteError = (openNotesState, id) =>
    openNotesState[id] && openNotesState[id].error;

const getNoteIsFetching = (openNotesState, id) =>
    openNotesState[id] && openNotesState[id].isFetching;

const getNotes = notesState =>
    notesState.notes;

const getNotesError = notesState =>
    notesState.error;

const getNotesIsFetching = notesState =>
    notesState.isFetching;

export { getNote, getNoteError, getNoteIsFetching, getNotes, getNotesError, getNotesIsFetching };