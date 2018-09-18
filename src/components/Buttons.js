import React from 'react';
import { Button } from 'reactstrap';


const ButtonNaked = (props) => {
  return (
    <Button {...props} size="sm" color="link">
      { props.children }
    </Button>
  );
};


export { ButtonNaked };