import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Nav, Collapse } from 'reactstrap';
import { NavLink, openNoteNavLink } from './Links';
import { ButtonNaked } from './Buttons';
import { getOpenNotes } from '../selectors/notes';
import { getIsAuthenticated } from '../selectors/auth';
import { isEmptyObject, dirtyRecordsExist, sortObjectsBy } from '../helpers';
import { NEW_ID, LOGOUT_PATH, NOTES_PATH, IDEAS_PATH, DASHBOARD_PATH, TAGS_PATH, ALERTS_PATH, BOOKMARKS_PATH } from '../constants';


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
            <NavLink to={DASHBOARD_PATH} auth={true}>Dash</NavLink>
            <NavLink to={TAGS_PATH} auth={true}>Tags</NavLink>
            <NavLink to={NOTES_PATH} auth={true}>Notes</NavLink>
            <NavLink to={IDEAS_PATH} auth={true}>Ideas</NavLink>
            <NavLink to={BOOKMARKS_PATH} auth={true}>Bookmarks</NavLink>
            <NavLink to={ALERTS_PATH} auth={true}>Alerts</NavLink>
            <NavLink to={LOGOUT_PATH} auth={true}>Logout</NavLink>
          </Nav>
        </Collapse>

        <Collapse isOpen={!subCollapsed}>
          <Nav className="container sub-nav justify-content-left">
            { !isEmptyObject(openNotesState) &&
              <NavLink to={NOTES_PATH} auth={true}>Notes</NavLink>
            }

            {
              sortObjectsBy({...openNotesState}, 'openedAt').reverse().map(note =>
                openNoteNavLink(note, (note.id || NEW_ID))
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
