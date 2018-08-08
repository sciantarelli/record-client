import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ButtonNaked from './ButtonNaked';
import { Nav, Navbar, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink, openNoteNavLink } from './Links';
import { getOpenNotes } from '../selectors/notes';


class Navigation extends Component {

  // TODO: Move this state into Redux, persist to local storage
  constructor(props) {
    super(props);

    this.state = {
      mainCollapsed: false,
      subCollapsed: false
    };
  }

  toggleMainNavbar = () => {
    this.setState({
      mainCollapsed: !this.state.mainCollapsed
    });
  };

  toggleSubNavbar = () => {
    this.setState({
      subCollapsed: !this.state.subCollapsed
    });
  };


  render() {
    const openNotesState = this.props.openNotesState;

    return (
      <div>
        <div class="bg-secondary">
          <Collapse isOpen={!this.state.mainCollapsed}>

          {/*<ul id="main-nav" className="nav-links">*/}
            <Nav id="main-nav" className="justify-content-center">
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

          <Collapse isOpen={!this.state.subCollapsed}>
            <Nav className="sub-nav nav-links justify-content-center">
              {
                Object.keys(openNotesState || {}).map(id =>
                  openNoteNavLink(openNotesState[id], id)
                )
              }
            </Nav>
          </Collapse>
        </div>

        <div className="d-flex justify-content-center">
          <ButtonNaked onClick={this.toggleMainNavbar}>
            Nav
          </ButtonNaked>

          <ButtonNaked onClick={this.toggleSubNavbar}>
            Open
          </ButtonNaked>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


export default withRouter(connect(mapStateToProps)(Navigation));
