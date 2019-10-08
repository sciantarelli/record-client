import React from 'react';
import { ButtonGroup } from "reactstrap";

import ActionsBar from "./ActionsBar";
import { ButtonNaked } from "./Buttons";


const CrudActionsBar = ({
    isDirty,
    callInProgress,
    data,
    doSave,
    doClose,
    doDelete
}) => {
    return (
        <ActionsBar>
            <ButtonGroup>
                <ButtonNaked disabled={callInProgress || !isDirty}
                             onClick={doSave}>
                    Save
                </ButtonNaked>

                <ButtonNaked disabled={callInProgress || !isDirty}
                             onClick={doSave}>
                    Save+Close
                </ButtonNaked>

                <ButtonNaked onClick={doClose}>Close</ButtonNaked>

                <ButtonNaked disabled={callInProgress || !data || !data.id}
                             onClick={doDelete}>
                    Delete
                </ButtonNaked>
            </ButtonGroup>
        </ActionsBar>
    )
};

export default CrudActionsBar;