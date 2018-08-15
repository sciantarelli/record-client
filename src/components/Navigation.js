import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink, openNoteNavLink } from './Links';
import { ButtonNaked } from './Buttons';
import { getOpenNotes } from '../selectors/notes';
import { getIsAuthenticated } from '../selectors/auth';
import { isEmptyObject, dirtyRecordsExist } from '../helpers';


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
    if (!this.props.isAuthed) return null;

    const { mainCollapsed, subCollapsed } = this.state;
    const openNotesState = this.props.openNotesState;
    const upArrow = '\u25b2';
    const downArrow = '\u25bc';

    return (
      <React.Fragment>
        <Collapse isOpen={!mainCollapsed}>
          <Nav id="main-nav" className="justify-content-center">
            <NavLink to="/" auth={true}>Dash</NavLink>
            <NavLink to="/tags" auth={true}>Tags</NavLink>
            <NavLink to="/notes" auth={true}>Notes</NavLink>
            <NavLink to="/ideas" auth={true}>Ideas</NavLink>
            <NavLink to="/bookmarks" auth={true}>Bookmarks</NavLink>
            <NavLink to="/alerts" auth={true}>Alerts</NavLink>
            <NavLink to="/logout" auth={true}>Logout</NavLink>
          </Nav>
        </Collapse>

        <Collapse isOpen={!subCollapsed}>
          <Nav className="container sub-nav justify-content-left">
            {
              Object.keys(openNotesState || {}).map(id =>
                openNoteNavLink(openNotesState[id], id)
              )
            }
          </Nav>
        </Collapse>

        <div id="nav-toggle-bar" className="d-flex justify-content-md-center justify-content-end">
          <span id="nav-toggle-buttons" className="bg-secondary">
            <ButtonNaked onClick={this.toggleMainNavbar}>
              Nav{mainCollapsed ? downArrow : upArrow}
            </ButtonNaked>

            { !isEmptyObject(openNotesState) &&
              <ButtonNaked onClick={this.toggleSubNavbar}
                           className={ dirtyRecordsExist(openNotesState) ? 'unsaved' : false }>
                Open{subCollapsed ? downArrow : upArrow}
              </ButtonNaked>
            }
          </span>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState),
  isAuthed: getIsAuthenticated(state.auth)
});


export default withRouter(connect(mapStateToProps)(Navigation));
