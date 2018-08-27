import { push } from 'connected-react-router';
import { put, take } from 'redux-saga/effects';
import { doNewNote } from '../actions/notes';
import { NOTES_PATH } from '../constants';


function* handleLocationChange(action) {
  const pathname = action.payload.location.pathname;

  switch (pathname) {
    case `${NOTES_PATH}/new` : {
      yield put(doNewNote());
      break;
    }
    default : {}
  }
}


// TODO: Refactor this when solid
// In lieu of this function, another idea is to add an argument to doUpdate and doCreate that allows for an optional redirect. However, this allows for many actions to be handled in sequence before the redirect, and may continue to expand in functionality. Also, this keeps the push calls out of other sagas, centralized to be handled here.
function* handleDispatchThenRoute(action) {
  const { actions, replaceId } = action;
  let { path } = action;
  const lastPathSegment = path.substr(path.lastIndexOf('/') + 1);
  const hasPathPlaceholder = lastPathSegment.startsWith(':');

  let result, newId, prop;

  try {
    for (let action of actions) {

      if (replaceId &&
          action.hasOwnProperty('id') &&
          !action.id) {

        if (!newId)
          throw('Actions can not be sequenced this way, the new id does not yet exist');

        action.id = newId;
      }

      yield put(action);

      if (!action.waitFor) continue;

      // What happens if there's two actions dispatched async that could both trigger the action being waited for here?
      result = yield take(action.waitFor);
      // console.log(result);

      if (result.error) throw result.error;

      if (result.type.includes('CREATE_SUCCESS')) {
        newId = result.id;

        if (hasPathPlaceholder) {
          prop = lastPathSegment.replace(':', '');
          path = path.replace(lastPathSegment, result[prop]);
        }
      }
    }

    yield put(push(path));

  } catch (error) {
    // TODO: Consider something here for general error handling
    console.log(error);
  }
}

export { handleDispatchThenRoute, handleLocationChange };