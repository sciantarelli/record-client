import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class AppLink extends Component {
  render() {
    const { location, children } = this.props;
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

const NavLink = withRouter(AppLink);


const openNoteNavLink = (openNote) => {
  if (!openNote.id) return;

  return componentNavLink(openNote, '/notes');
};


const componentNavLink = (component, path) => {
  return (
    <NavLink to={`${path}/${component.id}`}>
      {abbrevForNavLink(component.name)}
    </NavLink>
  );
};


const abbrevForNavLink = (text) => {
  const maxLength = 15;

  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
};


export { AppLink, NavLink, openNoteNavLink };