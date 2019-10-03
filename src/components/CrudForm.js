import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { reduxForm, initialize } from 'redux-form';
import { pick, isEmpty } from 'lodash';

import requireAuth from "./requireAuth";
import { CrudMessages } from "./async";
import CrudActionsBar from "./CrudActionsBar";

import { doTrackForm, doSave } from "../actions/crudActions";


const WrappedForm = ({ children }) => {
    // TODO: crud - Should this hookup to the redux store directly or should it expect data to be passed in no matter what?
    const mapStateToProps = state => ({

    });

    const mapDispatchToProps = {

    };

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

const CrudForm = ({
    id,
    formName,
    children,
    initialValues,
    endpoints,
    dataKey,
    dataObj,
    dataObj: { isFetching, data, changed },
    initialize,
    doTrackForm,
    doSave
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

    console.log(dataKey);
    return (
        <>
            <CrudActionsBar {...dataObj}
                doSave={() => {
                    doSave(endpoints.one, dataKey, id);
                            }} />
            <CrudMessages {...dataObj} />
            <ComposedForm>{children}</ComposedForm>
        </>
    )
};

const mapDispatchToProps = {
    initialize,
    doTrackForm,
    doSave
};

export default requireAuth(connect(null, mapDispatchToProps)(CrudForm));