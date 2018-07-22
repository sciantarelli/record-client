import { NOTE_CREATE, NOTE_CREATE_SUCCESS, NOTE_CREATE_ERROR, NOTES_FETCH, NOTES_FETCH_SUCCESS, NOTES_FETCH_ERROR, NOTE_UPDATE_SUCCESS } from '../constants/actionTypes';

const notesDefault = () => null;
const errorDefault = () => null;
const isFetchingDefault = () => false;


const INITIAL_STATE = {
  notes: notesDefault(),
  error: errorDefault(),
  isFetching: isFetchingDefault()
};


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NOTES_FETCH : {
      return {
        ...state,
        error: errorDefault(),
        isFetching: true
      }
    }
    case NOTES_FETCH_SUCCESS : {
      return {
        ...state,
        error: errorDefault(),
        isFetching: isFetchingDefault(),
        notes: action.notes
      }
    }
    case NOTES_FETCH_ERROR : {
      return {
        ...state,
        error: action.error,
        isFetching: isFetchingDefault(),
        notes: notesDefault()
      }
    }
    case NOTE_CREATE_SUCCESS: {
      return notesWithReplacement(state, action.note);
    }
    case NOTE_UPDATE_SUCCESS : {
      return notesWithReplacement(state, action.note);
    }

    default : return state;
  }
}

const notesWithReplacement = (state, note) => {
  if (!state.notes) return state;

  const { id, name, content } = note;

  return {
    ...state,
    notes: {
      ...state.notes,
      [id]: { id, name, content }
    }
  }
};