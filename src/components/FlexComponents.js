import React from 'react';


const render = (classes, children) => {
  return (
      <div className={classes}>
        { children }
      </div>
  );
};


const FlexContainer = (props) => {
  return render('flex-container', props.children);
};

const FlexFill = (props) => {
  return render('flex-fill', props.children);
};

const FlexFillContainer = (props) => {
  const { component, addClasses, ...subProps } = props;
  const Component = component || 'div';
  let classes = ['flex-container', 'flex-fill'];

  if (addClasses) {
    classes = classes.concat(
      Array.isArray(addClasses) ? addClasses : [ addClasses ]
    );
  }

  return React.createElement(
    Component,
    { className: classes.join(' '), ...subProps }
  );
};


export { FlexContainer, FlexFill, FlexFillContainer };