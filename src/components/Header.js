import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink, openNoteNavLink } from './Links';
import { getOpenNotes } from '../selectors/notes';


class Header extends Component {

  render() {
    const openNotesState = this.props.openNotesState;

    return (
      <div id="header">
        <ul id="main-nav" className="nav-links">
          <NavLink to="/login" auth={false}>Login</NavLink>
          <NavLink to="/logout" auth={true}>Logout</NavLink>
          <NavLink to="/" auth={true}>Dashboard</NavLink>
          <NavLink to="/notes" auth={true}>Notes</NavLink>
          <NavLink to="/ideas" auth={true}>Ideas</NavLink>
        </ul>

        <ul className="sub-nav nav-links">
          {
            Object.keys(openNotesState || {}).map(id =>
              openNoteNavLink(openNotesState[id], id)
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
