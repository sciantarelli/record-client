import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpenNotes } from '../selectors/notes';
import { NavLink, openNoteNavLink } from './Links';
import { withRouter } from 'react-router-dom';


class Header extends Component {

  render() {
    const openNotesState = this.props.openNotesState;
    const { pathname } = this.props.location;

    return (
      <div className="header">
        <ul>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/notes">All Notes</NavLink>
        </ul>

        <ul>
          {
            pathname != '/notes' &&
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
