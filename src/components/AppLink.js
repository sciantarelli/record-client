import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsAuthenticated } from '../selectors/auth';

const AppLink = (props) => {
  const { children, auth, isAuthed, to, inline, addClasses } = props;
  let classes = [...addClasses];

  if (auth && !isAuthed) return null;
  if ((auth === false) && isAuthed) return null;

  classes.unshift('app-link');

  if (inline) classes.push('d-inline-block');

  return(
      <li className={classes.join(' ')}>
        <Link to={to}>{children}</Link>
      </li>
  );
};

const mapStateToProps = (state) => ({
  isAuthed: getIsAuthenticated(state.auth)
});

AppLink.defaultProps = { inline: false, addClasses: [] };

export default connect(mapStateToProps)(AppLink);