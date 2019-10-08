import React from 'react';

const WarningMessages = ({ children }) => {
  return (
      <div className="warning-messages">
        { children }
      </div>
  );
};

export default WarningMessages;