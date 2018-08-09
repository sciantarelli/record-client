import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink, openNoteNavLink } from './Links';
import { ButtonNavToggle } from './Buttons';
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
      <React.Fragment>
        <Collapse isOpen={!this.state.mainCollapsed}>
          <Nav id="main-nav" className="justify-content-center">
            <NavLink to="/login" auth={false} addClasses={['testing']}>Login</NavLink>
            <NavLink to="/" auth={true}>Dash</NavLink>
            <NavLink to="/tags" auth={true}>Tags</NavLink>
            <NavLink to="/notes" auth={true}>Notes</NavLink>
            <NavLink to="/ideas" auth={true}>Ideas</NavLink>
            <NavLink to="/bookmarks" auth={true}>Bookmarks</NavLink>
            <NavLink to="/alerts" auth={true}>Alerts</NavLink>
            <NavLink to="/logout" auth={true}>Logout</NavLink>
          </Nav>
        </Collapse>

        <Collapse isOpen={!this.state.subCollapsed}>
          <Nav className="sub-nav justify-content-center">
            {
              Object.keys(openNotesState || {}).map(id =>
                openNoteNavLink(openNotesState[id], id)
              )
            }
          </Nav>
        </Collapse>

        <div id="nav-toggle-bar" className="d-flex justify-content-md-center justify-content-end">
          <span id="nav-toggle-buttons" className="bg-secondary">
            <ButtonNavToggle onClick={this.toggleMainNavbar}>
              Nav
            </ButtonNavToggle>

            { Object.keys(openNotesState).length > 0 &&
              <ButtonNavToggle onClick={this.toggleSubNavbar}>
                Open
              </ButtonNavToggle>
            }
          </span>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


export default withRouter(connect(mapStateToProps)(Navigation));
