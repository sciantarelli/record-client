import { NOTES_FETCH, NOTES_ADD, NOTES_FETCH_ERROR } from '../constants/actionTypes';

// TODO: Clean up this ugliness

const INITIAL_STATE = {
  notes: [],
  error: null,
  isFetching: false
};

const applyFetchNotes = (state, action) => ({
  notes: state.notes,
  error: null,
  isFetching: true
});

const applyAddNotes = (state, action) => ({
  notes: action.notes,
  error: null,
  isFetching: false
});

const applyFetchErrorNotes = (state, action) => ({
  notes: [],
  error: action.error,
  isFetching: false
});

function notesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NOTES_FETCH : {
      return applyFetchNotes(state, action)
    }
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