import React from 'react';
import { withRouter } from 'react-router-dom';
import { A } from './style';


const ComponentNavLink = (props) => {
  const { className, ...remainingProps } = props;

  return (
    <li className={className}>
      <A {...remainingProps} />
    </li>
  )
};


export default withRouter(ComponentNavLink);