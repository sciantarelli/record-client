import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { reduxForm, initialize } from 'redux-form';
import { pick, isEmpty } from 'lodash';

import requireAuth from "./requireAuth";
import { CrudMessages } from "./async";
import CrudActionsBar from "./CrudActionsBar";


const CrudFormWrapper = ({ children }) => {
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
        // TODO: crud - see Notes.js for notes on reinitialize
    })(CrudFormWrapper);
};

const CrudForm = ({
    id,
    formName,
    children,
    initialValues,
    dataObj,
    dataObj: { isFetching },
    initialize
}) => {
    const composedFormName = `${formName}${id}`;

    const [ComposedForm, setComposedForm] =
        useState(createForm(composedFormName, initialValues));

    useEffect(() => {
        if (isEmpty(dataObj) || isFetching) return;

        const values = pick(dataObj, Object.keys(initialValues));
        initialize(composedFormName, values);
    },[isFetching]);

    return (
        <>
            <CrudActionsBar {...dataObj} />
            <CrudMessages {...dataObj} />
            <ComposedForm>{children}</ComposedForm>
        </>
    )
};

const mapDispatchToProps = {
    initialize
};

export default requireAuth(connect(null, mapDispatchToProps)(CrudForm));