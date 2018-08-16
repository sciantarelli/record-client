import React from 'react';
import { withRouter } from 'react-router-dom';
import AppLink from './AppLink';

const NavLink = (props) => {
  const { location, to, addClasses } = props;
  const currentPath = location && location.pathname;
  let classes = [...addClasses];

  classes.push('nav-link');

  if ((currentPath === to))
    classes.push('active-link');

  return (
    <AppLink { ...props }
                      addClasses={classes}
                      inline />
  );
};

NavLink.defaultProps = { addClasses: [] };

export default withRouter(NavLink);