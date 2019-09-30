import React from 'react';

import Fetch from "./Fetch";
import CrudForm from "./CrudForm";

import { IDEA_FORM, IDEAS_ENDPOINT } from "../constants";
import { Field } from "redux-form";


const FormFields = () =>
    <>
        <Field
            className="component-name"
            name="name"
            type="text"
            component="input"
            value='testing'
        />

        <Field
            className="component-content flex-fill"
            name="content"
            type="text"
            component="textarea"
        />
    </>;

const IdeaForm = ({ id }) => {
    return (
        <Fetch endpoint={IDEAS_ENDPOINT} id={id}>
            <CrudForm formName={IDEA_FORM}>
                <FormFields/>
            </CrudForm>
        </Fetch>
    );
};

export default IdeaForm;