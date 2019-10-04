import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { reduxForm, initialize } from 'redux-form';
import { pick, isEmpty } from 'lodash';

import requireAuth from "./requireAuth";
import { CrudMessages } from "./async";
import CrudActionsBar from "./CrudActionsBar";

import { doTrackForm, doSave, doClose, doDelete } from "../actions/crudActions";
import { doDispatchThenRoute } from "../actions/routing";

import { NEW_ID } from "../constants";



const WrappedForm = ({ children, callInProgress }) => {
    return (
        <form>
            {React.cloneElement(children, { callInProgress })}
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
    callInProgress,
    initialize,
    doTrackForm,
    doSave,
    doDelete,
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
                    doDispatchThenRoute(doClose(dataKey, id), onClosePath);
                }}
                doDelete={() => {
                    doDelete(endpoints.one, dataKey, id, onClosePath)
                }}
            />
            <CrudMessages {...dataObj} />
            <ComposedForm callInProgress={callInProgress}>
                {children}
            </ComposedForm>
        </>
    )
};


const mapDispatchToProps = {
    initialize,
    doTrackForm,
    doSave,
    doDelete,
    doDispatchThenRoute,
};

export default requireAuth(connect(null, mapDispatchToProps)(CrudForm));