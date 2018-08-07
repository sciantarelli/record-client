import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink, openNoteNavLink } from './Links';
import { getOpenNotes } from '../selectors/notes';


class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }


  render() {
    const openNotesState = this.props.openNotesState;

    return (
      <Navbar>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2">
          T
        </NavbarToggler>

        <Collapse isOpen={!this.state.collapsed} navbar>

        {/*<ul id="main-nav" className="nav-links">*/}
          <Nav navbar>
            <NavLink to="/login" auth={false} addClasses={['testing']}>Login</NavLink>
            <NavLink to="/" auth={true}>Dashboard</NavLink>
            <NavLink to="/tags" auth={true}>Tags</NavLink>
            <NavLink to="/notes" auth={true}>Notes</NavLink>
            <NavLink to="/ideas" auth={true}>Ideas</NavLink>
            <NavLink to="/bookmarks" auth={true}>Bookmarks</NavLink>
            <NavLink to="/alerts" auth={true}>Alerts</NavLink>
            <NavLink to="/logout" auth={true}>Logout</NavLink>
          </Nav>
        {/*</ul>*/}
        </Collapse>

        <ul className="sub-nav nav-links">
          {
            Object.keys(openNotesState || {}).map(id =>
              openNoteNavLink(openNotesState[id], id)
            )
          }
        </ul>
      </Navbar>
    );
  }
}


const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


export default withRouter(connect(mapStateToProps)(Navigation));
