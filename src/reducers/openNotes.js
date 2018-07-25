import { NOTE_NEW, NOTE_CREATE, NOTE_CREATE_SUCCESS, NOTE_CREATE_ERROR, NOTE_CREATE_VALIDATION_ERRORS, NOTE_FETCH, NOTE_FETCH_SUCCESS, NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR, NOTE_FETCH_ERROR, NOTE_SYNC_WITH_FORM, NOTE_CLOSE } from '../constants/actionTypes';
import { deletePropertyFromObject } from '../helpers';


const errorDefault = () => null;
const isFetchingDefault = () => false;
const isSavingDefault = () => false;
const inputChangeOnlyDefault = () => false;

const INITIAL_STATE = {};

const DEFAULT_NOTE_STATE = {
  id: null,
  name: '',
  content: '',
  isFetching: isFetchingDefault(),
  isSaving: isSavingDefault(),
  error: errorDefault(),
  inputChange: inputChangeOnlyDefault()
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case '@@redux-form/CHANGE' :
      const { meta, payload, pathname } = action;

      if (meta.form !== 'note') return state;

      const id = pathname.substr(pathname.lastIndexOf('/') + 1);

      return {
        ...state,
        [id]: {
          ...state[id],
          [meta.field]: payload,
          inputChangeOnly: true
        }
      };
    case NOTE_NEW : {
      if (state['new']) return state;

      return {
        ...state,
        'new': DEFAULT_NOTE_STATE
      }
    }
    case NOTE_CREATE : {
      const id = 'new';

      return {
        ...state,
        [id]: {
          ...state[id],
          isSaving: true,
          error: errorDefault()
        }
      }
    }
    case NOTE_CREATE_SUCCESS : {
      const { id, name, content } = action.note;

      return {
        ...state,
        [id]: {
          ...DEFAULT_NOTE_STATE,
          id, name, content
        }
      }
    }
    case NOTE_CREATE_ERROR : {
      const id = 'new';

      return {
        ...state,
        [id]: {
          ...state[id],
          error: action.error,
          isSaving: isSavingDefault()
        }
      }
    }
    case NOTE_CREATE_VALIDATION_ERRORS : {
      const id = 'new';

      return {
        ...state,
        [id]: {
          ...state[id],
          validationErrors: action.errors,
          isSaving: isSavingDefault()
        }
      }
    }
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
    case NOTE_FETCH_SUCCESS : {
      return {
        ...state,
        [action.note.id]: {
          ...action.note,
          error: errorDefault(),
          isFetching: isFetchingDefault(),
          isSaving: isSavingDefault(),
          inputChange: inputChangeOnlyDefault()
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
      return deletePropertyFromObject(state, action.id);
    }

    default : return state;
  }
}