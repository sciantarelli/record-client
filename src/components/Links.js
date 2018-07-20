import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getIsAuthenticated } from '../selectors/auth';


class AppLink extends Component {
  render() {
    const { location, children, auth, isAuthed } = this.props;

    if (auth && !isAuthed) return null;
    if ((auth === false) && isAuthed) return null;

    const toPath = this.props.to;
    const currentPath = location && location.pathname;
    let className = 'app-link';

    if ((currentPath == toPath)) className = `${className} active-link`;

    return(
      <li className={className}>
        <Link to={toPath}>{children}</Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthed: getIsAuthenticated(state.auth)
});

const ConnectedAppLink = connect(mapStateToProps)(AppLink);

const NavLink = withRouter(ConnectedAppLink);


const openNoteNavLink = (openNote) => {
  if (!openNote.id) return;

  return componentNavLink(openNote, '/notes');
};


const componentNavLink = (component, path, requireAuth=true) => {
  return (
    <NavLink to={`${path}/${component.id}`} auth={requireAuth}>
      {abbrevForNavLink(component.name)}
    </NavLink>
  );
};


const abbrevForNavLink = (text) => {
  const maxLength = 15;

  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
};


export { ConnectedAppLink as AppLink, NavLink, openNoteNavLink };