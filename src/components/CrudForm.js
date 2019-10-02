import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { reduxForm, initialize } from 'redux-form';
import { pick, isEmpty } from 'lodash';

import requireAuth from "./requireAuth";
import { CrudMessages } from "./async";
import CrudActionsBar from "./CrudActionsBar";

import { doTrackForm } from "../actions/crudActions";


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
    })(CrudFormWrapper);
};

const CrudForm = ({
    id,
    formName,
    children,
    initialValues,
    dataKey,
    dataObj,
    dataObj: { isFetching, data },
    initialize,
    doTrackForm
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
            <CrudActionsBar {...dataObj} />
            <CrudMessages {...dataObj} />
            <ComposedForm>{children}</ComposedForm>
        </>
    )
};

const mapDispatchToProps = {
    initialize,
    doTrackForm
};

export default requireAuth(connect(null, mapDispatchToProps)(CrudForm));