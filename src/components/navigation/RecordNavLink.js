import React from 'react';
import { withRouter } from 'react-router-dom';
import { A } from '../shared/style';
import { NEW_ID } from '../../constants';
import { abbrevForNavLink } from '../../helpers';


const RecordNavLink = (props) => {
  const { location, component, basePath, className } = props;
  const to = `${basePath}/${component.id || NEW_ID}`;
  const currentPath = location && location.pathname;

  return (
    <li className={className}>
      <A to={to}
        isDirty={component.isDirty}
        isActive={currentPath === to}>
          {abbrevForNavLink(component.name)}
      </A>
    </li>
  )
};

export default withRouter(RecordNavLink);