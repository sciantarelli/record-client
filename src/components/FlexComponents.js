import React from 'react';

const FlexContainer = (props) => {
  return (
      <div class="flex-container">
        { props.children }
      </div>
  );
};

const FlexFill = (props) => {
  return (
      <div class="flex-fill">
        { props.children }
      </div>
  );
};




export { FlexContainer, FlexFill };