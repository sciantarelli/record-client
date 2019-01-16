import React from 'react';
import { connect } from 'react-redux';
import { getOpenNotes } from '../../../selectors/notes';


class OpenNotesMenu extends React.Component {
  render() {
    const { openNotesState } = this.props;

    return (
        <div>Open Notes Menu</div>
      // Could this be shared view with desktop sub nav?
    )
  }

}

const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


export default connect(mapStateToProps)(OpenNotesMenu);