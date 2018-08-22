import { NOTE_CREATE_SUCCESS, NOTES_FETCH, NOTES_FETCH_SUCCESS, NOTES_FETCH_ERROR, NOTE_UPDATE_SUCCESS, NOTE_DELETE_SUCCESS } from '../constants/actionTypes';
import { deletePropertyFromObject } from '../helpers';


const notesDefault = () => null;
const errorDefault = () => null;
const isFetchingDefault = () => false;


export const INITIAL_STATE = {
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
    case NOTE_DELETE_SUCCESS : {
      if (!state.notes) return state;

      return {
        ...state,
        notes: deletePropertyFromObject(state.notes, action.id)
      };
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