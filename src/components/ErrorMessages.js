import React from 'react';

const ErrorMessages = ({ children }) => {
  return (
    <ul className="error-messages">
      { children }
    </ul>
  );
};

export default ErrorMessages;