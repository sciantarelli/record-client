import React from 'react';
import { withRouter } from 'react-router-dom';
import { Footer, FlexFillColumnContainer } from '../../shared/style';
import { NavBottom } from '../';

// TODO: layout-changes - When resizing window, open note content is removed from the form. Not a huge deal, but should figure it out
class MenuWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Menu: null
    }
  };

  componentDidUpdate(prevProps) {
    // This checks the location object references instead of path string, because even if the path is the same we want to close the menu.
    if (this.props.location !== prevProps.location
          && this.state.Menu) {
        this.setState({ Menu: null });
    }
  }

  toggleMenu = Menu => {
    this.setState({
      Menu: ( this.state.Menu == Menu ? null : Menu )
    });
  };

  render = () => {
    const { children } = this.props;
    const { Menu } = this.state;

    return (
      <React.Fragment>
        <FlexFillColumnContainer>
          { !Menu && children }
          { Menu && <Menu /> }
        </FlexFillColumnContainer>

        <Footer>
          <NavBottom
              handler={this.toggleMenu}
              openMenu={Menu}
          />
        </Footer>
      </React.Fragment>
    )
  }

}

export default withRouter(MenuWrapper);