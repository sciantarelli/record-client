import axios from "axios";

import { authHeaders, cancelable } from "./index";
import { BASE_API_URL } from "../constants";
import {pathWithId} from "../helpers";

const get = (authState, endpoint) => {
    const request = axios.create({
        ...authHeaders(authState),
        method: 'get',
        url: `${BASE_API_URL}${endpoint}`
    });

    return cancelable(request);
};

const put = (endpoint, values, authState) => {
    return axios({
        ...authHeaders(authState),
        method: 'put',
        url: `${BASE_API_URL}${endpoint}`,
        data: {...values}
    });
};

const post = (endpoint, values, authState) => {
    return axios({
        ...authHeaders(authState),
        method: 'post',
        url: `${BASE_API_URL}${endpoint}`,
        data: {...values}
    });
};

const deleteRequest = (authState, endpoint) => {
    return axios({
        ...authHeaders(authState),
        method: 'delete',
        url: `${BASE_API_URL}${endpoint}`,
    })
};

const fetchList = (authState, endpoint) => {
    return get(authState, endpoint);
};

const crudCreate = (authState, endpoint, values) => {
    return post(endpoint, values, authState);
};

const crudUpdate = (authState, endpoint, values) => {
    return put(endpoint, values, authState);
};

const crudDelete = (authState, endpoint) => {
    return deleteRequest(authState, endpoint);
};

const makeEndpoints = (id, one, many) => {
    return {
        one: pathWithId(one, id),
        many: many
    }
};

export {
    get,
    makeEndpoints,
    fetchList,
    crudUpdate,
    crudCreate,
    crudDelete
}