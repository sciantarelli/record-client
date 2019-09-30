import {
    CRUD_FETCH_LIST,
    CRUD_FETCH_LIST_SUCCESS,
    CRUD_FETCH_LIST_ERROR
} from "../constants/actionTypes";


// QSTN: What is the benefit of having separate "List" and "One" action creators? Combine them?

const doFetchList = (endpoint, query) => ({
    type: CRUD_FETCH_LIST,
    endpoint,
    query,
});

const doFetchListSuccess = (dataKey, data) => ({
    type: CRUD_FETCH_LIST_SUCCESS,
    dataKey,
    data,
});

const doFetchListError = (dataKey, error) => ({
    type: CRUD_FETCH_LIST_ERROR,
    dataKey,
    error,
});

// TODO: crud - not all endpoints will map to data keys, such as openNotes

export {
    doFetchList,
    doFetchListSuccess,
    doFetchListError
}