import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecordNavUL, RecordNavLI, ComponentNavLI } from './style';
import { getOpenNotes } from '../../selectors/notes';
import { isEmptyObject, dirtyRecordsExist, sortObjectsBy } from '../../helpers';
import { NEW_ID, LOGOUT_PATH, NOTES_PATH, IDEAS_PATH, DASHBOARD_PATH, TAGS_PATH, ALERTS_PATH, BOOKMARKS_PATH } from '../../constants';

import { withRouter } from 'react-router-dom';


class NavTop extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  toggleVisible = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };


  render() {
    const { collapsed } = this.state;
    const { openNotesState } = this.props;
    const openRecordsExist = !isEmptyObject(openNotesState);

    // if not collapsed and notes are open
      // render navigation items
    // if notes are open
      // render toggle button

    // app-link nav-link active-link

    return (
      <React.Fragment>
        { !collapsed &&
          openRecordsExist &&

          <RecordNavUL>
            <ComponentNavLI
                to={NOTES_PATH}
                inline>
              Notes
            </ComponentNavLI>

            {
              sortObjectsBy({...openNotesState}, 'openedAt').reverse().map(note =>
                  <RecordNavLI
                      basePath={NOTES_PATH}
                      component={note} />
              )
            }
          </RecordNavUL>
        }

        { openRecordsExist && <div>toggle here</div>}
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


export default withRouter(connect(mapStateToProps)(NavTop));