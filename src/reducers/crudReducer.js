import { get } from 'lodash';

import {
    CRUD_FETCH,
    CRUD_FETCH_SUCCESS,
    CRUD_FETCH_ERROR,
    TRACK_FORM,
    FORM_INPUT_CHANGE
} from '../constants/actionTypes';
import {deletePropertyFromObject, isEmptyObject} from "../helpers";


const errorDefault = () => null;
const isFetchingDefault = () => false;


export default function(state = {}, action) {
    const stateCopy = {...state};
    const { id, data, dataKey } = action;

    switch(action.type) {
        case CRUD_FETCH : {
            // TODO: crud - clean up these cases, extract to functions
            if (id) {
                let record = get(stateCopy, `${dataKey}.${id}`);

                if (!record) {
                    record = action.defaultState || { data: {} };
                    record = {...record};
                    record.data.id = id;
                }

                return replaceOne(stateCopy, dataKey, {
                    ...record,
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
            if (data.id) {
                const record = get(stateCopy, `${dataKey}.${data.id}`);

                return replaceOne(stateCopy, dataKey, {
                    ...record,
                    data: { ...data },
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

        case FORM_INPUT_CHANGE : {
            const { id, dataKey, attr, value } = action;
            const record = stateCopy[dataKey][id];

            const recordChanged = record.changed;
            let changed;

            if (!recordChanged.hasOwnProperty(attr)) {
                changed = { ...recordChanged, [attr]: record.data[attr] };
            } else if (recordChanged[attr] === value) {
                changed = deletePropertyFromObject(recordChanged, attr);
            } else {
                changed = { ...recordChanged };
            }

            return replaceOne(stateCopy, dataKey, {
                ...record,
                data: {
                    ...record.data,
                    [attr]: value,
                },
                changed,
                isDirty: !isEmptyObject(changed)
            });
        }

        case TRACK_FORM : {
            const { formName, dataKey } = action;
            const stateCopy = {...state};

            if (!state.trackedForms) stateCopy.trackedForms = {};

            return {
                ...stateCopy,
                trackedForms: {
                    ...stateCopy.trackedForms,
                    [formName]: {
                        id,
                        dataKey
                    }
                }
            }
        }

        // case UNTRACK_FORM : {
        //
        // }

        default : return state;
    }
}


const replaceOne = (state, dataKey, dataState) => {
    return {
        ...state,
        [dataKey]: {
            ...state[dataKey],
            [dataState.data.id]: {...dataState}
        }
    }
};