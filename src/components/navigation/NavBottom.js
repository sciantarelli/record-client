import React from 'react';
import { connect } from 'react-redux';
import { Notes, Idea } from 'styled-icons/boxicons-solid';
import { Menu } from 'styled-icons/boxicons-regular/Menu';
import { MainMenu, OpenNotesMenu } from './';
import { NavBottomUL, NavBottomLI } from './style';
import { getOpenNotes } from '../../selectors/notes';
import { dirtyRecordsExist } from '../../helpers';


class NavBottom extends React.Component {

  render() {
    const { handler, openMenu, openNotesState } = this.props;

    // TODO: Remember, this is going to dynamically decide which nav buttons to display, based on open records

    return (
        <NavBottomUL>
          <NavBottomLI
              icon={Menu}
              handler={handler}
              menu={MainMenu}
              isActive={openMenu === MainMenu}>
          </NavBottomLI>

          <NavBottomLI
              icon={Notes}
              handler={handler}
              menu={OpenNotesMenu}
              isActive={openMenu === OpenNotesMenu}
              isDirty={dirtyRecordsExist(openNotesState)}>
          </NavBottomLI>

          <NavBottomLI
              icon={Idea}
              handler={handler}
              menu={MainMenu}
              isActive={openMenu === MainMenu}>
          </NavBottomLI>

          <NavBottomLI
              icon={Idea}
              handler={handler}
              menu={MainMenu}
              isActive={openMenu === MainMenu}>
          </NavBottomLI>

          <NavBottomLI
              icon={Idea}
              handler={handler}
              menu={MainMenu}
              isActive={openMenu === MainMenu}>
          </NavBottomLI>

        </NavBottomUL>
    )
  }
};


const mapStateToProps = state => {
   return { openNotesState: getOpenNotes(state.openNotesState) }
};


export default connect(mapStateToProps)(NavBottom);