import { NOTE_FETCH, NOTE_FETCH_SUCCESS, NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR, NOTE_FETCH_ERROR, NOTE_CLOSE } from '../constants/actionTypes';
import { deletePropertyFromObject } from '../helpers';


const errorDefault = () => null;
const isFetchingDefault = () => false;
const isSavingDefault = () => false;

const INITIAL_STATE = {};

const DEFAULT_NOTE_STATE = {
  id: null,
  name: '',
  content: '',
  isFetching: isFetchingDefault(),
  isSaving: isSavingDefault(),
  error: errorDefault(),
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    // TODO: Consider adding some sort of check on all these references to action.id, so not just anything can be set
    case NOTE_FETCH : {
      return {
        ...state,
        [action.id]: {
          ...DEFAULT_NOTE_STATE,
          isFetching: true
        }
      }
    }
    // TODO: Possibly rename ADD to something else, like FETCH SUCCESS
    case NOTE_FETCH_SUCCESS : {
      return {
        ...state,
        [action.note.id]: {
          ...action.note,
          error: errorDefault(),
          isFetching: isFetchingDefault(),
          isSaving: isSavingDefault()
        }
      }
    }
    case NOTE_FETCH_ERROR : {
      return {
        ...state,
        [action.id]: {
          ...DEFAULT_NOTE_STATE,
          error: action.error
        }
      }
    }
    case NOTE_UPDATE : {
      const id = action.formProps.id;

      return {
        ...state,
        [id]: {
          ...state[id],
          isSaving: true,
          error: errorDefault()
        }
      }
    }
    case NOTE_UPDATE_SUCCESS : {
      return {
        ...state,
        [action.note.id]: {
          ...action.note,
          isSaving: isSavingDefault()
        }
      }
    }
    case NOTE_UPDATE_ERROR : {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          error: action.error,
          isSaving: isSavingDefault()
        }
      }
    }
    case NOTE_CLOSE : {
      const { [action.id]:value, ...newState } = state;

      return deletePropertyFromObject(state, action.id);
    }

    default : return state;
  }
}