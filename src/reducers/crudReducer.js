import { get } from 'lodash';

import {
    CRUD_FETCH,
    CRUD_FETCH_SUCCESS,
    CRUD_FETCH_ERROR,
    TRACK_FORM,
    FORM_INPUT_CHANGE,
    CRUD_NEW,
    CRUD_SAVE,
    CRUD_SAVE_SUCCESS,
    CRUD_CLOSE,
    CRUD_DELETE,
    CRUD_DELETE_SUCCESS
} from '../constants/actionTypes';
import {deletePropertyFromObject, isEmptyObject} from "../helpers";
import { NEW_ID } from "../constants";


const errorDefault = () => null;
const validationErrorsDefault = () => null;
const isFetchingDefault = () => false;
const isSavingDefault = () => false;
const isDeletingDefault = () => false;
const inputChangeOnlyDefault = () => false;
const changedDefault = () => ({});
const isDirtyDefault = () => false;
const openedAtDefault = () => null;


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

        // TODO: crud - this doesn't fire when hard-reloading the page, "new" record not created
        case CRUD_NEW : {
            return replaceOne(state, dataKey, {
                ...action.defaultState,
                isDirty: true,
                openedAt: Date.now()
            }, NEW_ID);
        }

        case CRUD_SAVE : {
            const record = stateCopy[dataKey][id];

            return replaceOne(stateCopy, dataKey, {
                ...record,
                isSaving: true,
                error: errorDefault()
            }, id)
        }

        case CRUD_SAVE_SUCCESS : {
            const replaceId = action.replaceId;
            const selectId = replaceId || data.id;
            const record = stateCopy[dataKey][selectId];

            return replaceOne(stateCopy, dataKey, {
                ...record,
                data: {...data},
                isSaving: isSavingDefault(),
                changed: changedDefault(),
                isDirty: isDirtyDefault()
            })
        }

        case CRUD_DELETE : {
            const record = stateCopy[dataKey][id];

            return replaceOne(stateCopy, dataKey, {
                ...record,
                isDeleting: true
            });
        }

        case CRUD_DELETE_SUCCESS :
        case CRUD_CLOSE : {
            return {
                ...state,
                [dataKey]: deletePropertyFromObject(state[dataKey], id)
            }
        }

        // TODO: crud - add error case for FETCH

        case FORM_INPUT_CHANGE : {
            const { attr, value } = action;
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
            }, id);
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


const replaceOne = (state, dataKey, dataState, id) => {
    return {
        ...state,
        [dataKey]: {
            ...state[dataKey],
            [id || dataState.data.id]: {...dataState}
        }
    }
};