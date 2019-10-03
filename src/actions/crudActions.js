import {
    CRUD_FETCH,
    CRUD_FETCH_SUCCESS,
    CRUD_FETCH_ERROR,
    CRUD_SAVE,
    CRUD_SAVE_SUCCESS,
    TRACK_FORM,
    FORM_INPUT_CHANGE
} from "../constants/actionTypes";


const doFetch = (endpoint, dataKey, id, defaultState, query) => ({
    type: CRUD_FETCH,
    id,
    endpoint,
    dataKey,
    defaultState,
    query,
});

const doFetchSuccess = (dataKey, data) => ({
    type: CRUD_FETCH_SUCCESS,
    dataKey,
    data,
});

const doFetchError = (dataKey, error) => ({
    type: CRUD_FETCH_ERROR,
    dataKey,
    error,
});

const doSave = (endpoint, dataKey, id) => ({
    type: CRUD_SAVE,
    endpoint,
    dataKey,
    id
});

const doSaveSuccess = (dataKey, data) => ({
    type: CRUD_SAVE_SUCCESS,
    dataKey,
    data
});

const doTrackForm = (formName, dataKey, id) => ({
    type: TRACK_FORM,
    id,
    formName,
    dataKey
});

const doInputChange = (id, dataKey, attr, value) => ({
    type: FORM_INPUT_CHANGE,
    id,
    dataKey,
    attr,
    value
});

export {
    doFetch,
    doFetchSuccess,
    doFetchError,
    doSave,
    doSaveSuccess,
    doTrackForm,
    doInputChange
}