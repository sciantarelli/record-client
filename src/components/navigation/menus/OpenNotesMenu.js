import React from 'react';
import { connect } from 'react-redux';
import { RecordNavLI } from '../style';
import { getOpenNotes } from '../../../selectors/notes';
import { isEmptyObject, sortObjectsBy } from '../../../helpers';
import { NOTES_PATH } from '../../../constants';


class OpenNotesMenu extends React.Component {
  render() {
    const { openNotesState } = this.props;
    const openRecordsExist = !isEmptyObject(openNotesState);

    return (
      <React.Fragment>

      { openRecordsExist &&
        sortObjectsBy({...openNotesState}, 'openedAt').reverse().map(note =>
              <RecordNavLI basePath={NOTES_PATH}
                           component={note}
                           key={note.id} />
            )
      }

      </React.Fragment>
    )
  }

}

const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


export default connect(mapStateToProps)(OpenNotesMenu);