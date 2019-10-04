import { call, put, select, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { isEmpty, pick } from 'lodash';

import { fetchList, crudUpdate, crudCreate } from '../api/crudApi';
import { doAuthUpdated } from "../actions/auth";
import { doFetchSuccess, doFetchError, doInputChange, doSaveSuccess, doClose } from "../actions/crudActions";
import { handleNoResponse, is401AndHandled, is422AndHandled } from "./errors";

import { pathWithId } from "../helpers";


// TODO: crud - consider moving into selectors
const get_auth = (state) => state.auth;

const get_tracked_forms = (state, formName) => state.crud.trackedForms;

const changed_values = (state, ...args) => {
    const [ dataKey, id ] = args;
    const dataObj = state.crud[dataKey][id];

    return pick(dataObj.data, Object.keys(dataObj.changed));
};


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

function *handleSave(action) {
    const { endpoint, dataKey, id, createPath, isNewRecord } = action;

    const crudSave = isNewRecord ? crudCreate : crudUpdate;

    try {
        const auth = yield select(get_auth);
        const values = yield select(changed_values, dataKey, id);
        const result = yield call(crudSave, auth, endpoint, values);

        yield put(doAuthUpdated(result.headers));
        yield put(doSaveSuccess(dataKey, result.data, id));

        if (!isNewRecord) return;

        yield put(push(pathWithId(createPath, result.data.id)));
        yield put(doClose(dataKey, id));
    } catch (error) {
        // TODO: crud - implement error handling
        // const { response, request } = error;
        //
        // if (response) {
        //     if (yield* is401AndHandled(response)) return;
        //     if (yield* is422AndHandled(response, doNoteValidationErrors(id, getResponseErrors(response)))) return;
        //
        //     yield put(doUpdateNoteError(id, error));
        //     return;
        // }
        //
        // yield* handleNoResponse(request, doUpdateNoteError(id, error));
    }


}

function *handleFormDataChange(action) {
    yield delay(500); // Restricts to one input change per n

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
    handleSave,
    handleFormDataChange
}