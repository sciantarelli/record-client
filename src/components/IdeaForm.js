import React from 'react';
import { Field } from "redux-form";

import Fetch from "./Fetch";
import CrudForm from "./CrudForm";

import { IDEA_FORM, IDEAS_ENDPOINT, NOTE_ENDPOINT, NOTES_ENDPOINT } from "../constants";
import { DEFAULT_NOTE_STATE } from "../reducers/openNotes";
import { makeEndpoints } from "../api/crudApi";


const FormFields = () =>
    <>
        <Field
            className="component-name"
            name="name"
            type="text"
            component="input"
        />

        <Field
            className="component-content flex-fill"
            name="content"
            type="text"
            component="textarea"
        />
    </>;

const initialValues = { name: '', content: ''};

const IdeaForm = ({ id }) => {
    const endpoints = makeEndpoints(id, NOTE_ENDPOINT, NOTES_ENDPOINT);

    return (
        <Fetch endpoint={NOTE_ENDPOINT}
               id={id}
               openState={true}
               defaultState={DEFAULT_NOTE_STATE}>
            <CrudForm formName={IDEA_FORM}
                      initialValues={initialValues}
                      id={id}
                      endpoints={endpoints}>
                <FormFields/>
            </CrudForm>
        </Fetch>
    );
};

export default IdeaForm;