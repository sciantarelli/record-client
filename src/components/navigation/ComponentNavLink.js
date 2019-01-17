import React from 'react';
import { withRouter } from 'react-router-dom';
import { A } from '../shared/style';

let count = 0;

const ComponentNavLink = (props) => {
  const { className, location, to, children } = props;
  const currentPath = location && location.pathname;

  return (
    <li className={className}>
      <A to={to}
         isActive={currentPath === to}>
            {children}
      </A>
    </li>
  )
};


export default withRouter(ComponentNavLink);