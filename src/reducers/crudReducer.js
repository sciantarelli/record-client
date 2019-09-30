import {CRUD_FETCH_LIST_SUCCESS, CRUD_FETCH_LIST_ERROR, CRUD_FETCH_LIST} from '../constants/actionTypes';
import {makeDataKey} from "../helpers";


const errorDefault = () => null;
const isFetchingDefault = () => false;

export default function(state = {}, action) {
    console.log(action);

    let dataKey = action.dataKey;
    const { data, endpoint } = action;

    if (!dataKey && endpoint) dataKey = makeDataKey(endpoint);

    switch(action.type) {
        case CRUD_FETCH_LIST : {
            return {
                ...state,
                [dataKey]: {
                    data: {...state.data},
                    isFetching: true,
                    error: errorDefault()
                }
            }
        }

        case CRUD_FETCH_LIST_SUCCESS : {
            return {
                ...state,
                [dataKey]: {
                    data,
                    isFetching: isFetchingDefault(),
                    error: errorDefault()
                }
            }
        }

        // TODO: crud - add error case for FETCH

        default : return state;
    }
}