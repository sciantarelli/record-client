import { call, put, select, delay } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { fetchList } from '../api/crudApi';
import { doAuthUpdated } from "../actions/auth";
import { doFetchSuccess, doFetchError, doInputChange } from "../actions/crudActions";
import { handleNoResponse, is401AndHandled } from "./errors";


// TODO: crud - consider moving into selectors
const get_auth = (state) => state.auth;
const get_tracked_forms = (state, formName) => state.crud.trackedForms;


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

function *handleFormDataChange(action) {
    yield delay(500);

    const { meta: { form, field }, payload } = action;
    const trackedForms = yield select(get_tracked_forms);

    if (isEmpty(trackedForms)) return;

    const trackedForm = trackedForms[form];

    if (!trackedForm) return;

    const { id, dataKey } = trackedForm;

    yield put(doInputChange(id, dataKey, field, payload));
}

export {
    handleFetch,
    handleFormDataChange
}