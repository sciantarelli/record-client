import React from 'react';

const CrudMessages = ({ isFetching, isSaving, isDeleting, errorMessage, validationErrors }) => {

  return (
    <div className="messages-container">
      { isFetching && <div>Loading...</div> }
      { isSaving && <div>Saving...</div> }
      { isDeleting && <div>Deleting...</div> }

      <div className="error-messages">
        { errorMessage && !validationErrors && <p>{errorMessage}</p> }

        { validationErrors &&

          <ul>
            { validationErrors.map(error => <li>{error}</li>) }
          </ul>
        }
      </div>
    </div>
  );
};

export default CrudMessages;