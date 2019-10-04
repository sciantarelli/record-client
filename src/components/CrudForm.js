import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { reduxForm, initialize } from 'redux-form';
import { pick, isEmpty } from 'lodash';

import requireAuth from "./requireAuth";
import { CrudMessages } from "./async";
import CrudActionsBar from "./CrudActionsBar";

import { doTrackForm, doSave, doClose } from "../actions/crudActions";
import { doDispatchThenRoute } from "../actions/routing";
import { doCloseNote } from "../actions/notes";
import {NEW_ID, NOTES_PATH} from "../constants";



const WrappedForm = ({ children }) => {
    return (
        <form>
            {React.Children.map(children, child =>
                React.cloneElement(
                    child,
                    { disabled: true } // TODO: crud - make this dynamic
                )
            )}
        </form>
    );
};

const createForm = (formName, initialValues) => {
    return reduxForm({
        form: formName,
        initialValues: {...initialValues},
    })(WrappedForm);
};

const isNewRecord = (id) => id === NEW_ID;

const CrudForm = ({
    id,
    formName,
    children,
    initialValues,
    endpoints,
    onCreatePath,
    onClosePath,
    dataKey,
    dataObj,
    dataObj: { isFetching, data, changed },
    initialize,
    doTrackForm,
    doSave,
    doDispatchThenRoute
}) => {
    const composedFormName = `${formName}${id}`;

    const [ComposedForm, setComposedForm] =
        useState(createForm(composedFormName, initialValues));

    useEffect(() => {
        if (isEmpty(dataObj) || isFetching) return;

        const values = pick(data, Object.keys(initialValues));
        initialize(composedFormName, values);
    },[isFetching]);

    useEffect(() => {
        // TODO: crud - untrack when form is destroyed as well
       doTrackForm(composedFormName, dataKey, id);
    }, []);

    return (
        <>
            <CrudActionsBar {...dataObj}
                doSave={() => {
                    const endpoint = isNewRecord(id) ? endpoints.many : endpoints.one;
                    doSave(endpoint, dataKey, id, onCreatePath, isNewRecord(id));
                }}
                doClose={() => {
                    doDispatchThenRoute(doCloseNote(id), onClosePath);
                }}
            />
            <CrudMessages {...dataObj} />
            <ComposedForm>{children}</ComposedForm>
        </>
    )
};


const mapDispatchToProps = {
    initialize,
    doTrackForm,
    doSave,
    doDispatchThenRoute,
};

export default requireAuth(connect(null, mapDispatchToProps)(CrudForm));