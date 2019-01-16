import React from 'react';
import { Footer, FlexFillColumnContainer } from '../../shared/style';
import { NavBottom } from '../';


class MenuWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Menu: null
    }
  };


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

export default MenuWrapper;