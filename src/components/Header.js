import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink, openNoteNavLink } from './Links';
import { getOpenNotes } from '../selectors/notes';


class Header extends Component {

  render() {
    const openNotesState = this.props.openNotesState;
    const { pathname } = this.props.location;

    return (
      <div id="header">
        <ul id="main-nav" class="nav-links">
          <NavLink to="/login" auth={false}>Login</NavLink>
          <NavLink to="/logout" auth={true}>Logout</NavLink>
          <NavLink to="/" auth={true}>Dashboard</NavLink>
          <NavLink to="/notes" auth={true}>Notes</NavLink>
          <NavLink to="/ideas" auth={true}>Ideas</NavLink>
        </ul>

        <ul class="sub-nav nav-links">
          {
            Object.keys(openNotesState || {}).map(id =>
              openNoteNavLink(openNotesState[id])
            )
          }
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


export default withRouter(connect(mapStateToProps)(Header));
