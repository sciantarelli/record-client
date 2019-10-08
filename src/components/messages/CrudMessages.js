import React from 'react';
import { MessagesContainer, ErrorMessages } from '../async';

const CrudMessages = ({ isFetching, isSaving, isDeleting, errorMessage, validationErrors }) => {

  return (
    <MessagesContainer>
        {/* TODO: crud - turn these into components and share with Fetch perhaps */}
      { isFetching && <div>Loading...</div> }
      { isSaving && <div>Saving...</div> }
      { isDeleting && <div>Deleting...</div> }

      <ErrorMessages>
        { errorMessage && !validationErrors && <li>{errorMessage}</li> }

        { validationErrors &&

          validationErrors.map(error => <li>{error}</li>)
        }
      </ErrorMessages>
    </MessagesContainer>
  );
};

export default CrudMessages;