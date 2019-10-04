import {
    CRUD_FETCH,
    CRUD_FETCH_SUCCESS,
    CRUD_FETCH_ERROR,
    CRUD_NEW,
    CRUD_SAVE,
    CRUD_SAVE_SUCCESS,
    CRUD_DELETE,
    CRUD_DELETE_SUCCESS,
    CRUD_CLOSE,
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

const doNew = (dataKey, defaultState) => ({
    type: CRUD_NEW,
    dataKey,
    defaultState
});

const doSave = (endpoint, dataKey, id, onCreatePath, isNewRecord) => ({
    type: CRUD_SAVE,
    endpoint,
    dataKey,
    id,
    onCreatePath,
    isNewRecord
});

const doSaveSuccess = (dataKey, data, replaceId) => ({
    type: CRUD_SAVE_SUCCESS,
    dataKey,
    data,
    replaceId
});

const doDelete = (endpoint, dataKey, id, onDeletePath) => ({
    type: CRUD_DELETE,
    endpoint,
    dataKey,
    id,
    onDeletePath
});

const doDeleteSuccess = (dataKey, id) => ({
    type: CRUD_DELETE_SUCCESS,
    dataKey,
    id
});

const doClose = (dataKey, id) => ({
    type: CRUD_CLOSE,
    dataKey,
    id
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
    doNew,
    doSave,
    doSaveSuccess,
    doDelete,
    doDeleteSuccess,
    doClose,
    doTrackForm,
    doInputChange
}