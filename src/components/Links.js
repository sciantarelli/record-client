import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class AppLink extends Component {
  render() {
    const { location } = this.props;
    const toPath = this.props.to;
    const currentPath = location && location.pathname;
    const isCurrentPath = (currentPath == toPath);

    return(
        <li>
          { isCurrentPath ?
              <div>{this.props.children}</div> :
              <Link to={toPath}>{this.props.children}</Link>
          }
        </li>
    );
  }
}

const NavLink = withRouter(AppLink);

export { AppLink, NavLink };