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
  const Component = props.component || 'div';
  let addClasses = props.addClasses;
  let classes = ['flex-container', 'flex-fill'];

  const subProps = {
    ...props,
    component: undefined,
    addClasses: undefined
  };

  if (addClasses) {
    if (!Array.isArray(addClasses)) {
      addClasses = [addClasses];
    }

    classes = classes.concat(addClasses);
  }

  return React.createElement(
    Component,
    { className: classes.join(' '), ...subProps }
  );
};


export { FlexContainer, FlexFill, FlexFillContainer };