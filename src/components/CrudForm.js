import React from 'react';

import { reduxForm } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import requireAuth from "./requireAuth";
import dataLoading from "./dataLoading";
import ActionsBar from "./ActionsBar";
import {CrudMessages} from "./async";
import CrudActionsBar from "./CrudActionsBar";

const CrudForm = ({ children }) => {
    return (
        <form>
            {React.Children.map(children, child =>
                React.cloneElement(
                    child,
                    { disabled: true } // TODO: crud - make this dynamic
                )
            )}
        </form>
    )
};

const CrudFormWrapper = ({ id, endpoint, formName, children, dataObj }) => {

    // TODO: crud - if fetch isn't used, should this hookup to the redux store directly or should it expect data to be passed in no matter what?
    const mapStateToProps = state => ({

    });

    const mapDispatchToProps = {

    };

    const ComposedForm = compose(
        // connect(mapStateToProps, mapDispatchToProps),
        reduxForm({
            form: `${formName}${id}`,
            // TODO: crud - see Notes.js for notes on reinitialize
        })
    )(CrudForm);

    return (
        <>
            <CrudActionsBar {...dataObj} />
            <CrudMessages {...dataObj} />
            <ComposedForm>{children}</ComposedForm>
        </>
    );
};

export default requireAuth(CrudFormWrapper);