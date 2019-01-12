import React from 'react';
import { withRouter } from 'react-router-dom';
import { A } from '../shared/style';


const ComponentNavLink = (props) => {
  const { className, ...remainingProps } = props;
  const { to, location } = remainingProps;
  const currentPath = location && location.pathname;

  return (
    <li className={className}>
      <A isActive={currentPath === to} {...remainingProps} />
    </li>
  )
};


export default withRouter(ComponentNavLink);