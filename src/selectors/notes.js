const getReadableNotes = ({ notesState }) =>
    notesState.notes;

const getFetchError = ({ notesState }) =>
    notesState.error;

export { getReadableNotes, getFetchError };