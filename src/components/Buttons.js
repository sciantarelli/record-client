import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';


const ButtonNaked = (props) => {
  return (
    <Button {...props} size="sm" color="link">
      { props.children }
    </Button>
  );
};

const ButtonNavToggle = (props) => {
  return (
    <Button {...props} className="button-nav-toggle" size="sm" color="link">
      { props.children }
    </Button>
  )
};


export { ButtonNaked, ButtonNavToggle };