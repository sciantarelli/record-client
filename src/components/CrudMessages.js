import React from 'react';
import MessagesContainer from './MessagesContainer';
import ErrorMessages from './ErrorMessages';

const CrudMessages = ({ isFetching, isSaving, isDeleting, errorMessage, validationErrors }) => {

  return (
    <MessagesContainer>
      { isFetching && <div>Loading...</div> }
      { isSaving && <div>Saving...</div> }
      { isDeleting && <div>Deleting...</div> }

      <ErrorMessages>
        { errorMessage && !validationErrors && <p>{errorMessage}</p> }

        { validationErrors &&

          <ul>
            { validationErrors.map(error => <li>{error}</li>) }
          </ul>
        }
      </ErrorMessages>
    </MessagesContainer>
  );
};

export default CrudMessages;