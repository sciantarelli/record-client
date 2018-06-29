import { NOTES_ADD, NOTES_FETCH_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  notes: [],
  error: null,
};

const applyAddNotes = (state, action) => ({
  notes: action.notes,
  error: null,
});

const applyFetchErrorNotes = (state, action) => ({
  notes: [],
  error: action.error,
});

function notesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NOTES_ADD : {
      return applyAddNotes(state, action);
    }

    case NOTES_FETCH_ERROR : {
      return applyFetchErrorNotes(state, action);
    }

    default : return state;
  }
}


export default notesReducer;