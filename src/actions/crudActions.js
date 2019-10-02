import {
    CRUD_FETCH,
    CRUD_FETCH_SUCCESS,
    CRUD_FETCH_ERROR,
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
    doTrackForm,
    doInputChange
}