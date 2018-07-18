import { NOTES_FETCH, NOTES_ADD, NOTES_FETCH_ERROR, NOTE_UPDATE_SUCCESS } from '../constants/actionTypes';

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
    case NOTES_ADD : {
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
    case NOTE_UPDATE_SUCCESS : {
      if (!state.notes) return state;

      const { id, name, content } = action.note;

      return {
        ...state,
        notes: {
          ...state.notes,
          [action.note.id]: {
            id, name, content
          }
        }
      }
    }

    default : return state;
  }
}