import React from 'react';

const ErrorMessages = ({ children }) => {
  return (
    <div className="error-messages">
      { children }
    </div>
  );
};

export default ErrorMessages;