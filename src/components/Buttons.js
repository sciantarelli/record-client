import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';


const ButtonNaked = (props) => {
  return (
    <Button {...props} size="sm" color="link">
      { props.children }
    </Button>
  );
};


export { ButtonNaked };