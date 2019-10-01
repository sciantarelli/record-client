import { get } from 'lodash';

import { CRUD_FETCH, CRUD_FETCH_SUCCESS, CRUD_FETCH_ERROR } from '../constants/actionTypes';


const errorDefault = () => null;
const isFetchingDefault = () => false;


export default function(state = {}, action) {
    const { id, data, dataKey } = action;

    switch(action.type) {
        case CRUD_FETCH : {
            // TODO: crud - flesh out default object creation. Try to avoid having difference types of default state for different component types
            const stateCopy = {...state};

            // TODO: crud - clean up these cases, extract to functions
            if (id) {
                const data = get(stateCopy, `${dataKey}.${id}`) || { id };

                return replaceOne(stateCopy, dataKey, {
                    ...data,
                    isFetching: true,
                    error: errorDefault()
                });
            }

            const data = get(stateCopy, `${dataKey}.${data}`) || {} ;
            return {
                ...stateCopy,
                [dataKey]: {
                    data: {...data},
                    isFetching: true,
                    error: errorDefault()
                }
            }
        }

        case CRUD_FETCH_SUCCESS : {
            const stateCopy = {...state};

            if (data.id) {
                return replaceOne(stateCopy, dataKey, {
                    ...data,
                    isFetching: isFetchingDefault(),
                });
            }

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


const replaceOne = (state, dataKey, dataState) => {
    return {
        ...state,
        [dataKey]: {
            ...state[dataKey],
            [dataState.id]: {...dataState}
        }
    }
};