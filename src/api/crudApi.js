import axios from "axios";

import { authHeaders, cancelable } from "./index";
import { BASE_API_URL } from "../constants";

const get = (authState, endpoint) => {
    const request = axios.create({
        ...authHeaders(authState),
        method: 'get',
        url: `${BASE_API_URL}${endpoint}`
    });

    return cancelable(request);
};

const fetchList = (authState, endpoint) => {
    return get(authState, endpoint);
};

export {
    get,
    fetchList
}