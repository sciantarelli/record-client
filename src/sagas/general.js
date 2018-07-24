import { put } from 'redux-saga/effects';
import { doNewNote } from '../actions/notes';


function* handleLocationChange(action) {
  const { pathname } = action.payload;

  switch (pathname) {
    case '/notes/new' : {
      yield put(doNewNote());
      break;
    }
    default : {}
  }
}


export { handleLocationChange };