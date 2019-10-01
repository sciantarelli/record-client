import {
    CRUD_FETCH,
    CRUD_FETCH_SUCCESS,
    CRUD_FETCH_ERROR
} from "../constants/actionTypes";


const doFetch = (endpoint, dataKey, id, query) => ({
    type: CRUD_FETCH,
    id,
    endpoint,
    dataKey,
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

export {
    doFetch,
    doFetchSuccess,
    doFetchError
}