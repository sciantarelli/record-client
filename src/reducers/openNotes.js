import { NOTE_FETCH, NOTE_ADD, NOTE_FETCH_ERROR } from '../constants/actionTypes';


const errorDefault = () => null;
const isFetchingDefault = () => false;


const INITIAL_STATE = {
  2: {
    name: 'Open Note 2',
    content: 'Open Note 1 Content',
    isFetching: isFetchingDefault(),
    error: errorDefault()
  },
  3: {
    name: 'Open Note 3',
    content: 'Open Note 2 Content',
    isFetching: isFetchingDefault(),
    error: errorDefault()
  }
};


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NOTE_FETCH : {
      return {
        ...state,
        [action.id]: {
          isFetching: true,
          error: errorDefault()
        }
      }
    }
    case NOTE_ADD : {
      return {
        ...state,
        [action.note.id]: {
          ...action.note,
          error: errorDefault(),
          isFetching: isFetchingDefault()
        }
      }
    }
    case NOTE_FETCH_ERROR : {
      return {
        ...state,
        [action.id]: {
          isFetching: isFetchingDefault(),
          error: action.error
        }
      }
    }

    default : return state;
  }
}