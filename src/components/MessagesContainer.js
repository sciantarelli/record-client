import React from 'react';

const MessagesContainer = ({ children }) => {
  return (
    <div className="messages-container">
      { children }
    </div>
  );
};

export default MessagesContainer;