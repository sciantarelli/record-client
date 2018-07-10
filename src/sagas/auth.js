import { call, put } from 'redux-saga/effects';
import { postAuthUser } from '../api/auth';
import { authSuccess, authError } from '../actions/auth';

function* handleAuthUser(action) {
  const { formProps } = action;

  try {
    const result = yield call(postAuthUser, formProps);
    yield put(authSuccess(result.data));
  } catch (error) {
    yield put(authError(error));
  }
}

export { handleAuthUser };