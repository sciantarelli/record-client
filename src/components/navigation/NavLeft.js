import React from 'react';
import { NavItemsMain } from './';

// TODO: layout-changes Consider a HOC for Nav components if necessary
// TODO: layout-changes Don't forget about re-adding auth handling in the navigation, or deem whether that's even best

class NavLeft extends React.Component {

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

    return (
      <React.Fragment>
        { !collapsed && <NavItemsMain /> }
      </React.Fragment>
    )
  }
}


export default NavLeft;