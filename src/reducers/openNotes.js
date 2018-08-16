import { NOTE_NEW, NOTE_CREATE, NOTE_CREATE_SUCCESS, NOTE_CREATE_ERROR, NOTE_VALIDATION_ERRORS, NOTE_FETCH, NOTE_FETCH_SUCCESS, NOTE_FETCH_ERROR, NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_ERROR, NOTE_CLOSE, NOTE_DELETE, NOTE_DELETE_SUCCESS, NOTE_DELETE_ERROR } from '../constants/actionTypes';
import { deletePropertyFromObject, isEmptyObject } from '../helpers';

const nameDefault = () => '';
const contentDefault = () => '';
const errorDefault = () => null;
const validationErrorsDefault = () => null;
const isFetchingDefault = () => false;
const isSavingDefault = () => false;
const isDeletingDefault = () => false;
const inputChangeOnlyDefault = () => false;
const changedDefault = () => ({});
const isDirtyDefault = () => false;

const INITIAL_STATE = {};

const DEFAULT_NOTE_STATE = {
  id: null,
  name: nameDefault(),
  content: contentDefault(),
  isFetching: isFetchingDefault(),
  isSaving: isSavingDefault(),
  isDeleting: isDeletingDefault(),
  error: errorDefault(),
  validationErrors: validationErrorsDefault(),
  inputChangeOnly: inputChangeOnlyDefault(),
  changed: changedDefault(),
  isDirty: isDirtyDefault()
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case '@@redux-form/CHANGE' :
      const { meta, payload, pathname } = action;
      const prop = meta.field;

      if (meta.form !== 'note') return state;

      const id = pathname.substr(pathname.lastIndexOf('/') + 1);
      const note = state[id];
      const noteChanged = note.changed;
      let changed;

      if (!noteChanged.hasOwnProperty(prop)) {
        changed = { ...noteChanged, [prop]: note[prop] };
      } else if (noteChanged[prop] === payload) {
        changed = deletePropertyFromObject(noteChanged, prop);
      } else {
        changed = { ...noteChanged };
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          [meta.field]: payload,
          inputChangeOnly: true,
          error: errorDefault(),
          validationErrors: validationErrorsDefault(),
          changed,
          isDirty: !isEmptyObject(changed)
        }
      };
    case NOTE_NEW : {
      if (state['new']) return state;

      return {
        ...state,
        'new': {
          ...DEFAULT_NOTE_STATE,
          name: 'New Note',
          isDirty: true
        }
      }
    }
    case NOTE_CREATE : {
      const id = 'new';

      return {
        ...state,
        [id]: {
          ...state[id],
          isSaving: true,
          error: errorDefault(),
          inputChangeOnly: inputChangeOnlyDefault()
        }
      }
    }
    case NOTE_CREATE_SUCCESS : {
      const { id, name, content } = action.note;

      return {
        ...state,
        [id]: {
          ...DEFAULT_NOTE_STATE,
          id, name, content,
          changed: changedDefault(),
          isDirty: isDirtyDefault()
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
    case NOTE_VALIDATION_ERRORS : {
      const { id } = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          validationErrors: action.errors,
          isSaving: isSavingDefault(),
          isDeleting: isDeletingDefault()
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
      const { id, name, content } = action.note;

      return {
        ...state,
        [id]: {
          ...state[id],
          id, name, content,
          isFetching: false
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
          error: errorDefault(),
          inputChangeOnly: inputChangeOnlyDefault()
        }
      }
    }
    case NOTE_UPDATE_SUCCESS : {
      const { id } = action.note;

      return {
        ...state,
        [id]: {
          ...action.note,
          isSaving: isSavingDefault(),
          changed: changedDefault(),
          isDirty: isDirtyDefault()
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
    case NOTE_DELETE : {
      const id = action.id;

      return {
        ...state,
        [id]: {
          ...state[id],
          isDeleting: true
        }
      }
    }
    case NOTE_DELETE_SUCCESS : {
      return deletePropertyFromObject(state, action.id);
    }
    case NOTE_DELETE_ERROR : {
      const id = action.id;

      return {
          ...state,
        [id]: {
          ...state[id],
          isDeleting: false,
          error: action.error
        }
      }
    }

    default : return state;
  }
}