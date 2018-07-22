import { push } from 'react-router-redux';
import { put } from 'redux-saga/effects';


function* handleDispatchThenRoute(action) {
  yield put(action.action());
  yield put(push(action.path));
}


export { handleDispatchThenRoute };