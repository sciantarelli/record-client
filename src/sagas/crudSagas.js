import { call, put, select } from 'redux-saga/effects';
import { fetchList } from '../api/crudApi';
import { doAuthUpdated } from "../actions/auth";
import { doFetchSuccess, doFetchError } from "../actions/crudActions";
import { handleNoResponse, is401AndHandled } from "./errors";
import { makeDataKey} from "../helpers";


// TODO: crud - consider moving into selectors
const get_auth = (state) => state.auth;

function *handleFetch(action) {
    const { endpoint, dataKey } = action;

    try {
        const auth = yield select(get_auth);
        const result = yield call(fetchList, auth, endpoint);
        yield put(doAuthUpdated(result.headers));
        yield put(doFetchSuccess(dataKey, result.data))
    } catch (error) {
        const { response, request } = error;

        if (response) {
            if (yield* is401AndHandled(response)) return;

            yield put(doFetchError(dataKey, error));
            return;
        }

        yield* handleNoResponse(request, doFetchError(dataKey, error));
    }
}

export {
    handleFetch
}